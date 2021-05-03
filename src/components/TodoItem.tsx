import { useState, useEffect, ChangeEvent } from 'react';
import { Box, Flex, Text, HStack, VStack, Spacer, Spinner, Checkbox, Collapse, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

import { HttpUtil, ROUTE_API } from '../utils/http-util';

import SubtaskList from './SubtaskList';
import SubtaskForm from './SubtaskForm';
interface IProps {
  todo: ITodo;
  onDeleteTodo: (todo_id: string) => void;
  onChangeTodoStatus: (todo_id: string, status: string) => void;
}

const TodoItem = ({ todo, onDeleteTodo, onChangeTodoStatus }: IProps) => {
  const { isOpen, onToggle } = useDisclosure();

  const [isDeletingTodo, setDeletingTodo] = useState(false);
  const [isUpdatingTodoStatus, setUpdatingTodoStatus] = useState(false);

  const [subtasks, setSubtasks] = useState(todo.subtasks);
  const checkedTodo = subtasks.length > 0 ? subtasks.every(isAllSubtasksChecked) : todo.status === 'completed'; // checking status for todo item

  function isAllSubtasksChecked(subtask: ISubtask) {
    return subtask.status === 'completed';
  }

  useEffect(() => {
    // update todo status if all subtasks completed or re-open todo if one subtask is unchecked
    onChangeTodoStatus(todo.id, checkedTodo ? 'completed' : 'pending');
    // finish loading after updating todo status
    setUpdatingTodoStatus(false);
  }, [checkedTodo, setUpdatingTodoStatus]);

  const onCheckTodoItem = async (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatingTodoStatus(true);

    const status = event.target.checked ? 'completed' : 'pending';
    // update status for all subtask
    if (subtasks.length > 0) {
      await Promise.all(
        subtasks.map(async (subtask: ISubtask) => {
          // update only subtasks that are not the same as changing status
          if (subtask.status !== status) {
            await HttpUtil.patch(`${ROUTE_API.subtask}/${subtask.id}`, { status })
              .then((response) => {
                const updatedSubtasks = [...subtasks].map((subtask: ISubtask) => {
                  if (subtask.id === response.data.subtask.id) subtask.status = status;
                  return subtask;
                });
                setSubtasks(updatedSubtasks);
              })
              .catch((error) => {
                console.error('Updating subtask status: ', error);
              });
          }
        }),
      );
    } else onChangeTodoStatus(todo.id, status);
  };

  const onClickDeleteTodo = () => {
    setDeletingTodo(true);
    onDeleteTodo(todo.id);
  };

  // count the number of completed subtasks
  const handleCountCompletedSubtasks = (): number => {
    const countCompletedSubtasks = subtasks.reduce(
      (counter: number, subtask) => (subtask.status === 'completed' ? (counter += 1) : counter),
      0,
    );

    return countCompletedSubtasks;
  };

  return (
    <>
      <Box boxShadow="xl" px="4" py={subtasks.length > 0 ? '2' : '5'} rounded="md" bg="#506690" mb={3}>
        <Flex>
          <HStack>
            {isUpdatingTodoStatus ? (
              <Spinner size="md" color="red.100" />
            ) : (
              <Checkbox isChecked={checkedTodo} onChange={onCheckTodoItem} size="lg" colorScheme="red" defaultIsChecked>
                {todo.title}
              </Checkbox>
            )}
          </HStack>
          <Spacer />
          <VStack align="flex-end">
            <HStack>
              {isDeletingTodo ? (
                <Spinner size="md" color="red.100" />
              ) : (
                <button onClick={onClickDeleteTodo}>
                  <DeleteIcon size="xs" color="red.100" />
                </button>
              )}
              <Box ml={3}>
                <button onClick={onToggle}>
                  {isOpen ? <ChevronUpIcon w={6} h={6} /> : <ChevronDownIcon w={6} h={6} />}
                </button>
              </Box>
            </HStack>
            {subtasks.length > 0 && (
              <Text fontSize="xs">
                {handleCountCompletedSubtasks()} of {subtasks.length} completed
              </Text>
            )}
          </VStack>
        </Flex>

        {/* Hidden subtasks */}
        <Collapse in={isOpen} animateOpacity>
          <Box px={7} mt={5} mb={2}>
            {subtasks.length > 0 && <SubtaskList {...{ subtasks, setSubtasks }} />}
            <SubtaskForm {...{ todo_id: todo.id, subtasks, setSubtasks }} />
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default TodoItem;

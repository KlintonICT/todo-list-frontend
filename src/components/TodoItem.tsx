import { useState } from 'react';
import { Box, Flex, Text, HStack, VStack, Spacer, Spinner, Checkbox, Collapse, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

import SubtaskForm from './SubtaskForm';
interface IProps {
  todo: ITodo;
  onDeleteTodo: (todo_id: string) => void;
}

const TodoItem = ({ todo, onDeleteTodo }: IProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isDeletingTodo, setDeletingTodo] = useState(false);

  const onClickDeleteTodo = () => {
    setDeletingTodo(true);
    onDeleteTodo(todo.id);
  };

  return (
    <>
      <Box boxShadow="xl" px="4" py="2" rounded="md" bg="#506690" mb={3}>
        <Flex>
          <HStack>
            <Checkbox size="lg" colorScheme="red" defaultIsChecked>
              {todo.title}
            </Checkbox>
          </HStack>
          <Spacer />
          <VStack>
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
            <Text fontSize="xs">0 of 0 completed</Text>
          </VStack>
        </Flex>

        {/* Hidden subtasks */}
        <Collapse in={isOpen} animateOpacity>
          <Box px={7} mt={5} mb={2}>
            <SubtaskForm {...{ todo_id: todo.id }} />
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default TodoItem;

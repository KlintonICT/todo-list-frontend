import { useState } from 'react';
import { Box, Flex, Text, HStack, Spacer, Spinner, Checkbox, Collapse, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

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
      <Box boxShadow="xl" px="4" pt="4" pb="0" rounded="md" bg="#506690" mb={3}>
        <Flex>
          <HStack>
            <Checkbox size="lg" colorScheme="red" defaultIsChecked>
              {todo.title}
            </Checkbox>
          </HStack>
          <Spacer />
          {isDeletingTodo ? (
            <Spinner size="md" color="red.100" />
          ) : (
            <button onClick={onClickDeleteTodo}>
              <DeleteIcon size="xs" color="red.100" />
            </button>
          )}
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center">
          <button onClick={onToggle}>
            <HStack>
              <Text fontSize="xs">3 of 5 completed</Text>
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </HStack>
          </button>
        </Flex>

        {/* Hidden subtasks */}
        <Collapse in={isOpen} animateOpacity>
          <Text>Oh no</Text>
        </Collapse>
      </Box>
    </>
  );
};

export default TodoItem;

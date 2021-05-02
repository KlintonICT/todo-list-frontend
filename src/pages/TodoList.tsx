import { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import TodoForm from '../components/TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  return (
    <>
      {console.log(todos)}
      <Flex mt={20} alignItems="center" justifyContent="center">
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Heading as="h5" mb={5}>
            Todo App
          </Heading>
          <TodoForm {...{ todos, setTodos }} />
        </Flex>
      </Flex>
    </>
  );
};

export default TodoList;

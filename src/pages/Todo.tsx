import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';

import { HttpUtil, ROUTE_API } from '../utils/http-util';

import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const Todo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isRequestingTodos, setRequestingTodos] = useState(false);

  useEffect(() => {
    setRequestingTodos(true);

    HttpUtil.get(ROUTE_API.todo)
      .then((response) => {
        const { todoList } = response.data;
        setTodos(todoList);
        setRequestingTodos(false);
      })
      .catch((error) => {
        console.log('Getting todo list: ', error);
        setRequestingTodos(false);
      });
  }, []);

  return (
    <>
      <Flex pt={20} alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          width={['98%', '60%', '50%', '40%', '30%']}
        >
          <Heading as="h5" mb={5}>
            Todo App
          </Heading>
          <TodoForm {...{ todos, setTodos }} />
          <Box my={10} w="100%">
            {/* Requesting todos loading */}
            {isRequestingTodos && (
              <Flex justifyContent="center">
                <Spinner size="xl" color="red.100" />
              </Flex>
            )}
            {/* display todo list */}
            {!isRequestingTodos && todos.length > 0 && <div>{<TodoList {...{ todos, setTodos }} />}</div>}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Todo;

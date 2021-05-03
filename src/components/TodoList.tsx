import { SetStateAction } from 'react';
import { HttpUtil, ROUTE_API } from '../utils/http-util';

import TodoItem from './TodoItem';

interface IProps {
  todos: ITodo[];
  setTodos: (todos: SetStateAction<ITodo[]>) => void;
}

const TodoList = ({ todos, setTodos }: IProps) => {
  const onDeleteTodo = (todo_id: string) => {
    HttpUtil.delete(`${ROUTE_API.todo}/${todo_id}`)
      .then(() => {
        const remainTodos = [...todos].filter((todo: ITodo) => todo.id !== todo_id);
        setTodos(remainTodos);
      })
      .catch((error) => {
        console.log('Deleting todo item: ', error);
      });
  };

  const onChangeTodoStatus = (todo_id: string, status: string) => {
    // update todo status
    HttpUtil.patch(`${ROUTE_API.todo}/${todo_id}`, { status })
      .then(() => {
        const updatedTodos = [...todos].map((todo: ITodo) => {
          if (todo.id === todo_id) todo.status = status;
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.log('Updating todo status: ', error);
      });
  };

  return (
    <>
      {todos.map((todo: ITodo) => (
        <TodoItem {...{ todo, onDeleteTodo, onChangeTodoStatus }} key={todo.id} />
      ))}
    </>
  );
};

export default TodoList;

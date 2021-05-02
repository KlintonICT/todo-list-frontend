import { HttpUtil, ROUTE_API } from '../utils/http-util';

import TodoItem from './TodoItem';

interface IProps {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
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

  return (
    <>
      {todos.map((todo: ITodo) => (
        <TodoItem {...{ todo, onDeleteTodo }} key={todo.id} />
      ))}
    </>
  );
};

export default TodoList;

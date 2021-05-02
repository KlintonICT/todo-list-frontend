interface ITask {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

interface ISubtask extends ITask {
  todo_id: string;
}

interface ITodo extends ITask {
  subtasks: ISubtask[];
}

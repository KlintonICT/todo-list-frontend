import { useState } from 'react';
import { Box } from '@chakra-ui/react';

import SubtaskList from './SubtaskList';
import SubtaskForm from './SubtaskForm';

interface IProps {
  todo_id: string;
  subtaskList: ISubtask[];
}

const Subtask = ({ todo_id, subtaskList }: IProps) => {
  const [subtasks, setSubtasks] = useState(subtaskList);

  return (
    <Box px={7} mt={5} mb={2}>
      <SubtaskList {...{ subtasks, setSubtasks }} />
      <SubtaskForm {...{ todo_id, subtasks, setSubtasks }} />
    </Box>
  );
};

export default Subtask;

import { SetStateAction } from 'react';
import { Box } from '@chakra-ui/react';
import { HttpUtil, ROUTE_API } from '../utils/http-util';

import SubtaskItem from './SubtaskItem';

interface IProps {
  subtasks: ISubtask[];
  setSubtasks: (subtasks: SetStateAction<ISubtask[]>) => void;
}

const SubtaskList = ({ subtasks, setSubtasks }: IProps) => {
  const onDeleteSubtask = (subtask_id: string) => {
    HttpUtil.delete(`${ROUTE_API.subtask}/${subtask_id}`)
      .then(() => {
        const remainSubtasks = [...subtasks].filter((subtask: ISubtask) => subtask.id !== subtask_id);
        setSubtasks(remainSubtasks);
      })
      .catch((error) => {
        console.log('Deleting subtask item: ', error);
      });
  };

  return (
    <>
      {subtasks.length > 0 && (
        <Box mb={5}>
          {subtasks.map((subtask: ISubtask) => (
            <SubtaskItem key={subtask.id} {...{ subtask, subtasks, setSubtasks, onDeleteSubtask }} />
          ))}
        </Box>
      )}
    </>
  );
};

export default SubtaskList;

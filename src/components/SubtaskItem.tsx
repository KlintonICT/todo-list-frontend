import { useState, ChangeEvent } from 'react';
import { Box, Flex, Spacer, Spinner, Checkbox } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { HttpUtil, ROUTE_API } from '../utils/http-util';
interface IProps {
  subtask: ISubtask;
  subtasks: ISubtask[];
  setSubtasks: (subtasks: ISubtask[]) => void;
  onDeleteSubtask: (subtask_id: string) => void;
}

const SubtaskItem = ({ subtask, subtasks, setSubtasks, onDeleteSubtask }: IProps) => {
  const [isDeletingSubtask, setDeletingSubtask] = useState(false);
  const [isUpdatingSubtask, setUpdatingSubtask] = useState(false);

  const onClickDeleteSubtask = () => {
    setDeletingSubtask(true);
    onDeleteSubtask(subtask.id);
  };

  // update checking subtask status
  const onClickChangeSubtaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatingSubtask(true);
    const status = event.target.checked ? 'completed' : 'pending';
    HttpUtil.patch(`${ROUTE_API.subtask}/${subtask.id}`, { status })
      .then(() => {
        const updatedSubtasks = [...subtasks].map((subtaskTemp: ISubtask) => {
          if (subtask.id === subtaskTemp.id) subtaskTemp.status = status;
          return subtaskTemp;
        });
        setSubtasks(updatedSubtasks);
        setUpdatingSubtask(false);
      })
      .catch((error) => {
        console.log('Updating subtask status: ', error);
        setUpdatingSubtask(false);
      });
  };

  return (
    <Box boxShadow="md" p={2} rounded="md" bg="#42ba96" mb={3}>
      <Flex alignItems="center">
        {isUpdatingSubtask ? (
          <Spinner size="xs" color="red.100" />
        ) : (
          <Checkbox
            size="sm"
            colorScheme="orange"
            defaultIsChecked
            isChecked={subtask.status === 'completed'}
            onChange={onClickChangeSubtaskStatus}
          >
            {subtask.title}
          </Checkbox>
        )}
        <Spacer />
        {isDeletingSubtask ? (
          <Spinner size="md" color="red.100" />
        ) : (
          <button onClick={onClickDeleteSubtask}>
            <DeleteIcon size="xs" color="red.100" />
          </button>
        )}
      </Flex>
    </Box>
  );
};

export default SubtaskItem;

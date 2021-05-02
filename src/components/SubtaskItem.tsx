import { useState } from 'react';
import { Box, Flex, Spacer, Spinner, Checkbox } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface IProps {
  subtask: ISubtask;
  onDeleteSubtask: (subtask_id: string) => void;
}

const SubtaskItem = ({ subtask, onDeleteSubtask }: IProps) => {
  const [isDeletingSubtask, setDeletingSubtask] = useState(false);

  const onClickDeleteSubtask = () => {
    setDeletingSubtask(true);
    onDeleteSubtask(subtask.id);
  };

  return (
    <Box boxShadow="md" p={2} rounded="md" bg="#42ba96" mb={3}>
      <Flex>
        <Checkbox size="sm" colorScheme="orange" defaultIsChecked>
          {subtask.title}
        </Checkbox>
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

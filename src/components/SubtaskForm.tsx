import { SetStateAction } from 'react';
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';
import { Form, Field, Formik, FieldProps } from 'formik';

import { HttpUtil, ROUTE_API } from '../utils/http-util';

interface IProps {
  todo_id: string;
  subtasks: ISubtask[];
  setSubtasks: (subtasks: SetStateAction<ISubtask[]>) => void;
}

const SubtaskForm = ({ todo_id, subtasks, setSubtasks }: IProps) => {
  const onSubmit = (title: string, setSubmitting: { (isSubmitting: boolean): void }) => {
    HttpUtil.post(ROUTE_API.subtask, { title, todo_id })
      .then((response) => {
        const newSubtask = response.data.subtask;
        setSubtasks([...subtasks, newSubtask]);
        setSubmitting(false);
      })
      .catch((error) => {
        console.log('Creating subtask: ', error);
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ title: '' }}
      enableReinitialize
      onSubmit={({ title }, { setSubmitting }) => onSubmit(title, setSubmitting)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="title">
            {({ field }: FieldProps) => (
              <InputGroup size="md">
                <Input
                  {...field}
                  variant="filled"
                  pr="6rem"
                  placeholder="What are the steps?"
                  backgroundColor="rgb(255,255,255, 0.2)"
                  isRequired
                />
                <InputRightElement width="6rem">
                  <Button h="1.75rem" size="sm" colorScheme="red" type="submit" isLoading={isSubmitting}>
                    New Step
                  </Button>
                </InputRightElement>
              </InputGroup>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default SubtaskForm;

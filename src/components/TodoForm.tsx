import { HStack, Input, Button } from '@chakra-ui/react';
import { Form, Field, Formik, FieldProps } from 'formik';

import { HttpUtil, ROUTE_API } from '../utils/http-util';

interface IProps {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
}

const TodoForm = ({ todos, setTodos }: IProps) => {
  const onSubmit = (title: string, setSubmitting: { (isSubmitting: boolean): void }) => {
    HttpUtil.post(ROUTE_API.todo, { title })
      .then((response) => {
        const { todo } = response.data;
        setTodos([...todos, todo]);
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
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
          <HStack spacing={5}>
            <Field name="title">
              {({ field }: FieldProps) => (
                <Input
                  {...field}
                  focusBorderColor="red.100"
                  placeholder="What to do?"
                  colorScheme="red.100"
                  borderColor="red.100"
                />
              )}
            </Field>
            <Button type="submit" px={7} isLoading={isSubmitting} colorScheme="red">
              New List
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;

import { act, render, fireEvent } from '@testing-library/react';

import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/react';

import Todo from '../pages/Todo';

test('Test todo title in input field', async () => {
  const { findByText, getByPlaceholderText } = render(
    <ChakraProvider theme={theme}>
      <Todo />
    </ChakraProvider>,
  );

  const input = getByPlaceholderText('What to do?') as HTMLInputElement;
  const submitBtn = await findByText('New List');
  await act(async () => {
    fireEvent.change(input, { target: { value: 'My first todo' } });
    fireEvent.click(submitBtn);
  });
  expect(input.value).toBe('My first todo');
});

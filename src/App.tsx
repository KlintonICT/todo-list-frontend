import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme';

import Todo from './pages/Todo';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Todo />
    </ChakraProvider>
  );
}

export default App;

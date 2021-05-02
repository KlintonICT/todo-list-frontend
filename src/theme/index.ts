import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: 'dark',
  },
  colors: {
    red: {
      100: '#e22061',
    },
  },
});

export default theme;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import PackageFinder from './npm/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Package seems to have an error with setting theme, work around so you don't have to look at a white screen */}
    {localStorage.setItem('chakra-ui-color-mode', 'dark')}
    <ChakraProvider>
      <PackageFinder />
    </ChakraProvider>
  </React.StrictMode>
);

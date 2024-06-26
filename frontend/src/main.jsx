import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { GoogleMapsProvider } from './GoogleMapsProvider';

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider theme={theme}>
      <GoogleMapsProvider>
        <App />
      </GoogleMapsProvider>
    </MantineProvider>
)

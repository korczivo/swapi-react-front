import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import { LoadingStatusProvider } from './contexts/FetchStatus';
import { GameProvider } from './contexts/GameContext';

const theme = createTheme({
  palette: {
    background: {
      default: '#21253a',
    },
    primary: {
      main: '#c393ff',
    },
    secondary: {
      main: '#fd90ff',
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", "Helvetica", "Arial", monospace',
  },
});

const THEME = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: theme.palette.background.default,
          color: '#fff',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  },
  palette: {
    primary: {
      main: theme.palette.primary.main,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={THEME}>
    <CssBaseline />
    <GameProvider>
      <LoadingStatusProvider>
        <App />
      </LoadingStatusProvider>
    </GameProvider>
  </ThemeProvider>
);

// src/theme/theme.js
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4caf50', // Button + Checkbox + Input active
    secondary: '#66bb6a',
    background: '#f5fff5',
    error: '#d32f2f',
  },
};

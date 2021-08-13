import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import App from './App'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const ThemedApp = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [userOverrideDarkMode, setUserOverrideDarkMode] = useState(prefersDarkMode)
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: userOverrideDarkMode ? 'dark' : 'light',
        },
      }),
    [userOverrideDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App darkMode={userOverrideDarkMode} setDarkMode={setUserOverrideDarkMode}/>
    </ThemeProvider>
  )
}

const app = document.getElementById("app");
ReactDOM.render(<ThemedApp />, app);

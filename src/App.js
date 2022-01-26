import { createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import System from './System';
import './styles/App.css';
import { ThemeProvider } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f62405',
    },
    secondary: {
      main: '#1dd67d',
    },
    tertiary: {
      main: '#fb9905',
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          {/* Login Form Component  */}
          <Route path="/" element={<Login />} />
          {/* System Component */}
          <Route path="/dashboard/home" element={<System />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

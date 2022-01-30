import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import System from './System';
import Home from './components/Home';
import CreateTicket from './components/CreateTicket';
import './styles/App.css';
import Settings from './components/Settings';
import History from './components/History';
import Analytics from './components/Analytics';
import { AuthProvider } from './Contexts/authContext';
import Ticket from './components/Ticket';

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
    status: {
      main: '#fff',
    },
    // Shadow
    grey: {
      main: '#777777',
      light: '#efefef',
    },

    black: {
      main: '#3a3a3a',
    },
  },
});
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            {/* Login Form Component  */}
            <Route path="/" element={<Login />} />
            {/* System Component */}
            <Route element={<System />}>
              <Route path="/dashboard/home" element={<Home />} />
              <Route
                path="/dashboard/createTicket"
                element={<CreateTicket />}
              />
              <Route path="/dashboard/history" element={<History />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/ticket/:id" element={<Ticket />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

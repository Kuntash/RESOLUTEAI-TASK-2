import { createTheme, ThemeProvider } from "@material-ui/core";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import System from "./System";
import "./styles/App.css";
const theme = createTheme({
  color: {
    primary: "#fa2611",
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

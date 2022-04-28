import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alert from "./components/Alert";
import { MainApp } from "./components/MainApp";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import Disciplines from "./pages/Disciplines";
import Instructors from "./pages/Instructors";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const theme = createTheme({
    palette: {
      secondary: { main: "#424445" },
      background: { default: "#FAFAFA", paper: "#FAFAFA" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="app" element={<MainApp />}>
                <Route path="/app/disciplinas" element={<Disciplines />} />
                <Route
                  path="/app/pessoas-instrutoras"
                  element={<Instructors />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
          <Alert />
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;

import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Form from "../components/Form";
import PasswordInput from "../components/PasswordInput";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

const styles = {
  container: {
    marginTop: "180px",
    width: "460px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  title: { marginBottom: "30px" },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
    marginBottom: "26px",
  },
  input: { marginBottom: "16px" },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

interface FormData {
  email: string;
  password: string;
}

function SignIn() {
  const { signIn } = useAuth();
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!formData?.email || !formData?.password) {
      setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
      return;
    }

    const { email, password } = formData;

    try {
      const {
        data: { token },
      } = await api.signIn({ email, password });
      signIn(token);
      navigate("/app/disciplinas");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setMessage({
          type: "error",
          text: error.response.data,
        });
        return;
      }

      setMessage({
        type: "error",
        text: "Erro, tente novamente em alguns segundos!",
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Logo />
      <Box sx={styles.container}>
        <Typography sx={styles.title} variant="h4" component="h1">
          Login
        </Typography>
        <Button variant="contained" color="secondary">
          Entrar com Github
        </Button>
        <Box sx={styles.dividerContainer}>
          <Divider sx={{ flex: "1" }} />
          <Typography variant="caption" component="span">
            ou
          </Typography>
          <Divider sx={{ flex: "1" }} />
        </Box>
        <TextField
          name="email"
          sx={styles.input}
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.email}
        />
        <PasswordInput
          name="password"
          sx={styles.input}
          label="Senha"
          onChange={handleInputChange}
          value={formData.password}
        />
        <Box sx={styles.actionsContainer}>
          <Link component={RouterLink} to="/">
            <Typography>Não possuo cadastro</Typography>
          </Link>
          <Button variant="contained" type="submit">
            Entrar
          </Button>
        </Box>
      </Box>
    </Form>
  );
}

export default SignIn;

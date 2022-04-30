import {
  Typography,
  Box,
  Divider,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

function TestCreation() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [disciplines, setDisciplines] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function loadPage() {
      if (!token) return;
      const { data: categoriesData } = await api.getCategories(token);
      const categoriesName: string[] = [];
      for (let category of categoriesData.categories) {
        categoriesName.push(category.name);
      }
      setCategories(categoriesName);
    }
    loadPage();
  }, []);
  console.log(categories);
  function handleSubmit() {}
  function handleCategoryChange(value: string) {}
  function handleDisciplineChange(value: string) {}
  function handleTeacherChange(value: string) {}
  return (
    <>
      <Typography
        sx={{
          marginX: "auto",
          marginBottom: "25px",
          width: "450px",
          fontWeight: "Bold",
          justifyContent: "center",
          display: "flex",
        }}
      >
        Adicionar uma Prova
      </Typography>
      <Divider sx={{ marginBottom: "35px" }} />
      <Box
        sx={{
          marginX: "auto",
          width: "700px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/app/disciplinas")}
          >
            Disciplinas
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/app/pessoas-instrutoras")}
          >
            Pessoa Instrutora
          </Button>
          <Button variant="outlined" onClick={() => navigate("/app/adicionar")}>
            Adicionar
          </Button>
        </Box>
        <Form onSubmit={handleSubmit}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <TextField fullWidth={true}></TextField>
            <TextField fullWidth={true}></TextField>
            <Autocomplete
              fullWidth={true}
              id="category-input"
              options={categories}
              autoComplete={true}
              onInputChange={(e, value) => handleCategoryChange(value)}
              renderInput={(params) => (
                <TextField {...params} label="Categoria" />
              )}
            />
            <Autocomplete
              fullWidth={true}
              id="discipline-input"
              options={[]}
              autoComplete={true}
              onInputChange={(e, value) => handleDisciplineChange(value)}
              renderInput={(params) => (
                <TextField {...params} label="Disciplina" />
              )}
            />
            <Autocomplete
              fullWidth={true}
              id="teacher-input"
              options={[]}
              autoComplete={true}
              onInputChange={(e, value) => handleTeacherChange(value)}
              renderInput={(params) => (
                <TextField {...params} label="Pessoa Instrutora" />
              )}
            />
            <Button
              fullWidth={true}
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "#FFF",
                backgroundColor: "#1976D2",
              }}
            >
              Enviar
            </Button>
          </Box>
        </Form>
      </Box>
    </>
  );
}
export default TestCreation;

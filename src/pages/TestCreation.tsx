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
import useAlert from "../hooks/useAlert";
import { AxiosError } from "axios";

function TestCreation() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [teachers, setTeachers] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    pdfUrl: "",
    categoryName: "",
    disciplineName: "",
    teacherName: "",
  });
  const { token } = useAuth();
  const { setMessage } = useAlert();

  useEffect(() => {
    async function loadPage() {
      if (!token) return;
      const { data: categoriesData } = await api.getCategories(token);
      const categoriesName: string[] = [];
      for (let category of categoriesData.categories) {
        categoriesName.push(category.name);
      }
      setCategories(categoriesName);
      const { data: disciplinesData } = await api.getDisciplines(token);
      const disciplinesName: string[] = [];
      for (let discipline of disciplinesData.disciplines) {
        disciplinesName.push(discipline.name);
      }
      setDisciplines(disciplinesName);
      setTeachers([]);
      setFormData({
        name: "",
        pdfUrl: "",
        categoryName: "",
        disciplineName: "",
        teacherName: "",
      });
    }
    loadPage();
  }, []);

  function handleDropDownChange(field: string, value: string) {
    setFormData({ ...formData, [field]: value });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    try {
      await api.addTest(formData, token);
      setMessage({
        type: "success",
        text: "Prova adicionada com sucesso!",
      });
      setTeachers([]);
      setFormData({
        name: "",
        pdfUrl: "",
        categoryName: "",
        disciplineName: "",
        teacherName: "",
      });
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
      console.log(error);
    }
  }

  async function handleDisciplineChange(value: string) {
    if (!token) return;
    setTeachers([]);
    setFormData({ ...formData, teacherName: "", disciplineName: value });
    if (!value) return;
    const { data: teacherData } = await api.getTeachersByDiscipline(
      value,
      token
    );
    const teachersName: string[] = [];
    for (let teacher of teacherData.teachers) {
      teachersName.push(teacher.teacher.name);
    }
    setTeachers(teachersName);
  }

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
            variant="outlined"
            onClick={() => navigate("/app/pessoas-instrutoras")}
          >
            Pessoa Instrutora
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/app/adicionar")}
          >
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
            <TextField
              fullWidth={true}
              name="name"
              type="text"
              label="Titulo da prova"
              onChange={handleInputChange}
              value={formData.name}
            />
            <TextField
              fullWidth={true}
              name="pdfUrl"
              type="uri"
              label="PDF da prova"
              onChange={handleInputChange}
              value={formData.pdfUrl}
            />
            <Autocomplete
              fullWidth={true}
              options={categories}
              autoComplete={true}
              value={formData.categoryName}
              onInputChange={(e, value) =>
                handleDropDownChange("categoryName", value)
              }
              renderInput={(params) => (
                <TextField {...params} label="Categoria" />
              )}
            />
            <Autocomplete
              fullWidth={true}
              options={disciplines}
              autoComplete={true}
              value={formData.disciplineName}
              onInputChange={(e, value) => handleDisciplineChange(value)}
              renderInput={(params) => (
                <TextField {...params} label="Disciplina" />
              )}
            />
            <Autocomplete
              fullWidth={true}
              options={teachers}
              autoComplete={true}
              // disabled={formData.disciplineName === ""}
              value={formData.teacherName}
              onInputChange={(e, value) =>
                handleDropDownChange("teacherName", value)
              }
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
              type="submit"
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

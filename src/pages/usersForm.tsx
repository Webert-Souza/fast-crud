import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import { PageHeader } from "../components/PageHeader";
import { Group, User } from "../types";

import usersService from "../services/users.services";
import groupsService from "../services/groups.services";

type Params = { id: string };

export const UsersForm = () => {
  const { id } = useParams<Params>();
  const history = useHistory();

  const [email, setEmail] = useState(true);
  const [pageHeader, setPageHeader] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Campo obrigatório")
      .matches(/^[a-zA-Z ]+$/, "Digite apenas letras")
      .min(3, "Mínimo 3 caracteres"),
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(6, "Mínimo 6 caracteres"),
    confirmPassword: yup
      .string()
      .required("Campo obrigatório")
      .oneOf([yup.ref("password")], "Redigite a mesma senha"),
    groupId: yup
      .number()
      .required("Campo obrigatório")
      .moreThan(0, "Selecione uma opção"),
  });

  const validateEmail = async () => {
    let uniqueEmail = true;
    const response = await usersService.getByEmail(formik.values.email);

    if (+id) {
      if (response.data.length > 0 && response.data[0].id !== +id) {
        uniqueEmail = false;
      }
    } else {
      if (response.data.length > 0) {
        uniqueEmail = false;
      }
    }

    setEmail(uniqueEmail);
    return uniqueEmail;
  };

  const onSubmit = async () => {
    try {
      const response = await validateEmail();

      if (response) {
        const user: User = {
          id: +id,
          name: formik.values.name,
          email: formik.values.email,
          password: formik.values.password,
          groupId: formik.values.groupId,
        };

        if (!id) {
          await usersService.create(user);
        } else {
          await usersService.update(user);
        }

        history.push("/users");
      }
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      groupId: 0,
    },
    validationSchema,
    onSubmit,
  });

  const options = [
    { icon: CloseOutlinedIcon, tooltip: "Fechar", link: "/users", cb: null },
  ];

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await groupsService.getAll();
        setGroups(response.data);
      } catch (error) {}
    };

    loadGroups();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await usersService.getById(+id);
        formik.initialValues.name = response.data.name;
        formik.initialValues.email = response.data.email;

        // corrigir ao implantar a tela de login, visto que terei a senha digitada
        // aqui neste momento só tenho o hash. se eu jogar o hash no campo a senha
        // será alterada a cada save
        formik.initialValues.password = "123456"; //response.data.password;
        formik.initialValues.confirmPassword = formik.initialValues.password;
        formik.initialValues.groupId = response.data.groupId;
        formik.resetForm();
      } catch (error) {}
    };

    if (id) {
      setPageHeader("Usuários -> Editar");
      loadUser();
    } else {
      setPageHeader("Usuários -> Inserir");
    }
  }, [id]);

  return (
    <>
      <Container maxWidth="xl">
        <PageHeader
          name={pageHeader}
          icon={PeopleAltOutlinedIcon}
          options={options}
        />

        <Snackbar
          open={!email}
          autoHideDuration={3000}
          onClose={() => setEmail(true)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setEmail(true)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Este email não pode ser utilizado!
          </Alert>
        </Snackbar>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          sx={{ m: "15px" }}
        >
          <Grid container spacing={3} sx={{ mb: "15px" }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                autoFocus={+id !== 1 ? true : false}
                id="name"
                name="name"
                label="Nome"
                variant={+id === 1 ? "filled" : "outlined"}
                InputProps={{
                  readOnly: +id === 1,
                }}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                autoFocus={+id === 1 ? true : false}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Senha"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar senha"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                select
                fullWidth
                id="groupId"
                name="groupId"
                label="Grupo"
                required
                variant={+id === 1 ? "filled" : "outlined"}
                InputProps={{
                  readOnly: +id === 1,
                }}
                value={formik.values.groupId}
                onChange={formik.handleChange}
                error={formik.touched.groupId && Boolean(formik.errors.groupId)}
                helperText={formik.touched.groupId && formik.errors.groupId}
              >
                <MenuItem key={0} value={0} disabled>
                  {"Selecione uma opção..."}
                </MenuItem>
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container my={2} justifyContent="flex-end" columns={12}>
            <Grid item>
              <Button
                size="large"
                variant="outlined"
                color="success"
                sx={{ mr: 2 }}
                type="submit"
              >
                Salvar
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={() => history.push("/users")}
              >
                Fechar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

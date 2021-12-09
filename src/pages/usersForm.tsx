import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

import {
  Box,
  Button,
  Grid,
  Container,
  TextField,
  MenuItem,
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

  // const validateEmail = (value: any) =>
  //   new Promise(async function (resolve, reject) {
  //     const response = await usersService.getByEmail(formik.values.email);
  //     const emailAlreadyUsed: Boolean = +id
  //       ? response.data[0].id !== +id
  //       : response.data.length > 0;
  //     resolve(emailAlreadyUsed);
  //   });

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Campo obrigatório")
      .min(3, "Mínimo 3 caracteres"),
    //.lowercase()
    //.notOneOf(["admin", "administrador"], "Esse nome não pode ser usado.").when,
    email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
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

  const onSubmit = async () => {
    try {
      const response = await usersService.getByEmail(formik.values.email);

      const emailAlreadyUsed = +id
        ? response.data[0].id !== +id
        : response.data.length > 0;

      if (!emailAlreadyUsed) {
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
    validate: async (value) => {
      const response = await usersService.getByEmail(formik.values.email);
      const emailAlreadyUsed: Boolean = +id
        ? response.data[0].id !== +id
        : response.data.length > 0;
      return emailAlreadyUsed;
    },
  });

  const [pageHeader, setPageHeader] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);

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
        setPageHeader("Usuários -> Editar");
        formik.initialValues.name = response.data.name;
        formik.initialValues.email = response.data.email;
        formik.initialValues.password = response.data.password;
        formik.initialValues.confirmPassword = response.data.password;
        formik.initialValues.groupId = response.data.groupId;
        formik.resetForm();

        if (+id === 1) {
        }
      } catch (error) {}
    };

    if (id) {
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

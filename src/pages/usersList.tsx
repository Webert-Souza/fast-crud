import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DetailsOutlinedIcon from "@mui/icons-material/DetailsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import { PageHeader } from "../components/PageHeader";
import { formatDate } from "../helpers";
import { User } from "../types";

import usersService from "../services/users.services";

export const UsersList = () => {
  const history = useHistory();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [group, setGroup] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const loadUsers = async () => {
    try {
      const response = await usersService.getAll();
      setUsers(response.data);
    } catch (error) {}
  };

  const options = [
    {
      icon: RefreshOutlinedIcon,
      tooltip: "Atualizar",
      link: "",
      cb: loadUsers,
    },
    {
      icon: AddOutlinedIcon,
      tooltip: "Inserir",
      link: "/users/create",
      cb: null,
    },
  ];

  const deleteUser = async (user: User) => {
    loadUser(user);
    setOpenDialogDelete(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await usersService.delete(id);
      loadUsers();
    } catch (error) {
    } finally {
      setOpenDialogDelete(false);
    }
  };

  const loadUser = (user: User) => {
    setId(user.id);
    setName(user.name);
    setEmail(user.email);
    setCreatedAt(formatDate(user.created_at as Date));
    setGroup(user.group?.name as string);
  };

  const detailsUser = (user: User) => {
    loadUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <PageHeader
          name="Usu??rios"
          icon={PeopleAltOutlinedIcon}
          options={options}
        />

        <TableContainer component={Paper}>
          <Table size="medium">
            <TableHead sx={{ backgroundColor: "#ddd" }}>
              <TableRow>
                <TableCell>N??</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Grupo</TableCell>
                <TableCell align="center">Data Cadastro</TableCell>
                <TableCell align="center">A????es</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.group?.name}</TableCell>
                  <TableCell align="center">
                    {formatDate(user.created_at as Date)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Detalhes" arrow placement="bottom">
                      <IconButton
                        size="large"
                        edge="start"
                        color="info"
                        aria-label="menu"
                        sx={{ fontWeight: "normal" }}
                        onClick={() => detailsUser(user)}
                      >
                        <DetailsOutlinedIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar" arrow placement="bottom">
                      <IconButton
                        size="large"
                        edge="start"
                        color="info"
                        aria-label="menu"
                        onClick={() => history.push(`users/update/${user.id}`)}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Excluir" arrow placement="bottom">
                      <IconButton
                        size="large"
                        edge="start"
                        color="error"
                        aria-label="menu"
                        disabled={user.id === 1 ? true : false}
                        sx={{ fontWeight: "normal" }}
                        onClick={() => deleteUser(user)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle sx={{ fontWeight: "normal" }}>
            {"Usu??rios -> Detalhes"}
          </DialogTitle>
          <DialogContent dividers sx={{ background: "#f9fafa" }}>
            <TextField
              margin="normal"
              label="Nome"
              fullWidth
              autoFocus
              InputProps={{
                readOnly: true,
              }}
              value={name}
            />
            <TextField
              margin="normal"
              label="Email"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={email}
            />
            <TextField
              margin="normal"
              label="Grupo"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={group}
            />
            <TextField
              margin="normal"
              label="Data Cadastro"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={createdAt}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{ mr: 2, my: 1 }}
            >
              Fechar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDialogDelete}
          onClose={handleCloseDialogDelete}
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "normal" }}>
            {"Usu??rios -> Excluir"}
          </DialogTitle>
          <DialogContent dividers sx={{ background: "#f9fafa" }}>
            Confirma a exclus??o do Usu??rio: <br /> {name}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => handleDelete(id)}>
              Sim
            </Button>
            <Button
              onClick={handleCloseDialogDelete}
              variant="outlined"
              sx={{ mr: 2, my: 1 }}
            >
              N??o
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

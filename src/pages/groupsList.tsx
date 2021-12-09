import React, { useEffect, useState } from "react";

import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DetailsOutlinedIcon from "@mui/icons-material/DetailsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import { PageHeader } from "../components/PageHeader";
import { formatDate } from "../helpers";
import { Group } from "../types";

import groupsService from "../services/groups.services";

export const GroupsList = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  const loadGroups = async () => {
    try {
      const response = await groupsService.getAll();
      setGroups(response.data);
    } catch (error) {}
  };

  const options = [
    {
      icon: RefreshOutlinedIcon,
      tooltip: "Atualizar",
      link: "",
      cb: loadGroups,
    },
    {
      icon: AddOutlinedIcon,
      tooltip: "Inserir",
      link: "",
      cb: null,
      disabled: true,
    },
  ];

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <PageHeader name="Grupos" icon={GroupsOutlinedIcon} options={options} />

        <TableContainer component={Paper}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Nº</TableCell>
                <TableCell>Grupo</TableCell>
                <TableCell>Usuários</TableCell>
                <TableCell align="center">Data Cadastro</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {groups.map((group, index) => (
                <TableRow key={group.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.users.length}</TableCell>
                  <TableCell align="center">
                    {formatDate(group.created_at as Date)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="large"
                      edge="start"
                      color="info"
                      aria-label="menu"
                      title="Detalhes"
                      sx={{ fontWeight: "normal" }}
                      disabled={true}
                    >
                      <DetailsOutlinedIcon />
                    </IconButton>

                    <IconButton
                      size="large"
                      edge="start"
                      color="info"
                      aria-label="menu"
                      title="Editar"
                      disabled={true}
                    >
                      <EditOutlinedIcon />
                    </IconButton>

                    <IconButton
                      size="large"
                      edge="start"
                      color="error"
                      aria-label="menu"
                      title="Excluir"
                      sx={{ fontWeight: "normal" }}
                      disabled={true}
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

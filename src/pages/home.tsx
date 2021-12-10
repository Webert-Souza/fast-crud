import React, { useState, useEffect } from "react";

import {
  Box,
  Container,
  Paper,
  Slide,
  styled,
  Typography,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import groupsService from "../services/groups.services";
import usersService from "../services/users.services";

import { PageHeader } from "../components/PageHeader";

export const Home = () => {
  const [users, setUsers] = useState(0);
  const [groups, setGroups] = useState(0);
  const [transition, setTransition] = useState(false);

  const loadDashboard = async () => {
    try {
      const responseGroups = await groupsService.getAll();
      setGroups(responseGroups.data.length);

      const responseUsers = await usersService.getAll();
      setUsers(responseUsers.data.length);

      setTransition(true);
    } catch (error) {}
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const options = [
    {
      icon: RefreshOutlinedIcon,
      tooltip: "Atualizar",
      link: "",
      cb: loadDashboard,
    },
  ];

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <PageHeader
          name="Dashboard"
          icon={DashboardOutlinedIcon}
          options={options}
        />

        <Box sx={{ width: 500, minHeight: 393, m: "auto", mt: 5 }}>
          <Masonry columns={2} spacing={2}>
            <Slide
              in={transition}
              timeout={1000}
              direction="left"
              mountOnEnter
              unmountOnExit
            >
              <Item
                sx={{
                  height: "350px",
                  background: "darkgray",
                  color: "white",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <PeopleAltOutlinedIcon
                  sx={{ fontSize: "150px" }}
                ></PeopleAltOutlinedIcon>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "normal", mt: -2, mb: 2 }}
                >
                  Usuários
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                  {users}
                </Typography>
              </Item>
            </Slide>

            <Slide
              in={transition}
              timeout={1000}
              direction="down"
              mountOnEnter
              unmountOnExit
            >
              <Item sx={{ height: "150px", background: "#ddd" }}>
                Fast CRUD
              </Item>
            </Slide>

            <Slide
              in={transition}
              timeout={1000}
              direction="right"
              mountOnEnter
              unmountOnExit
            >
              <Item
                sx={{
                  height: "350px",
                  background: "darkgray",
                  color: "white",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <GroupsOutlinedIcon
                  sx={{ fontSize: "150px" }}
                ></GroupsOutlinedIcon>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "normal", mt: -4, mb: 2 }}
                >
                  Grupos
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                  {groups}
                </Typography>
              </Item>
            </Slide>

            <Slide
              in={transition}
              timeout={1000}
              direction="up"
              mountOnEnter
              unmountOnExit
            >
              <Item sx={{ height: "150px", background: "#ddd" }}>
                Fast CRUD
              </Item>
            </Slide>
          </Masonry>
        </Box>
      </Container>
    </>
  );
};

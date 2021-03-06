import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  Link,
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function Header() {
  const history = useHistory();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const technologies = [
    { name: "ReactJS", link: "https://reactjs.org/" },
    { name: "TypeScript", link: "https://www.typescriptlang.org/" },
    {
      name: "React-router-dom",
      link: "https://github.com/remix-run/react-router",
    },
    { name: "Material User Interface", link: "https://mui.com/" },
    { name: "Axios", link: "https://axios-http.com/" },
    { name: "BcryptJS", link: "https://github.com/dcodeIO/bcrypt.js" },
    { name: "Formik", link: "https://formik.org/" },
    { name: "Yup", link: "https://github.com/jquense/yup" },
    { name: "Json-server", link: "https://github.com/typicode/json-server" },
    { name: "Git", link: "https://github.com/Webert-Souza/fast-crud" },
  ];

  return (
    <Box sx={{ display: "flex", mb: 0.5 }}>
      <AppBar
        position="static"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Tooltip title="Menu" arrow placement="bottom">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="Menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            >
              <MenuOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "normal" }}
          >
            Fast CRUD
          </Typography>

          <div>
            <Tooltip title="Dashboard" arrow placement="bottom">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Dashboard"
                onClick={() => history.push("/home")}
                sx={{ mr: 6 }}
              >
                <DashboardOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Usu??rios" arrow placement="bottom">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="Usu??rios"
                onClick={() => history.push("/users")}
                sx={{ mr: -1 }}
              >
                <PeopleAltOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer open={toggleMenu} anchor="left" variant="persistent">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <List sx={{ width: "80px" }}>
            <Tooltip title="Dashboard" arrow placement="right">
              <IconButton
                sx={{ mt: 10, ml: 2 }}
                size="large"
                edge="start"
                color="inherit"
                aria-label="Dashboard"
                onClick={() => {
                  setToggleMenu(!toggleMenu);
                  history.push("/home");
                }}
              >
                <DashboardOutlinedIcon />
              </IconButton>
            </Tooltip>
          </List>
          <List sx={{ width: "80px" }}>
            <Tooltip title="Usu??rios" arrow placement="right">
              <IconButton
                sx={{ ml: 2 }}
                size="large"
                edge="start"
                color="inherit"
                aria-label="Usu??rios"
                onClick={() => {
                  setToggleMenu(!toggleMenu);
                  history.push("/users");
                }}
              >
                <PeopleAltOutlinedIcon />
              </IconButton>
            </Tooltip>
          </List>
          <List sx={{ width: "80px" }}>
            <Tooltip title="Grupos" arrow placement="right">
              <IconButton
                sx={{ ml: 2 }}
                size="large"
                edge="start"
                color="inherit"
                aria-label="Grupos"
                onClick={() => {
                  setToggleMenu(!toggleMenu);
                  history.push("/groups");
                }}
              >
                <GroupsOutlinedIcon />
              </IconButton>
            </Tooltip>
          </List>
          <List sx={{ width: "80px" }}>
            <Tooltip title="Sobre" arrow placement="right">
              <IconButton
                sx={{ ml: 2 }}
                size="large"
                edge="start"
                color="inherit"
                aria-label="Sobre"
                onClick={() => {
                  setToggleMenu(!toggleMenu);
                  setOpenDialog(true);
                }}
              >
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </List>
        </Box>
      </Drawer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontWeight: "normal" }}>{"Sobre"}</DialogTitle>
        <DialogContent dividers sx={{ background: "#f9fafa", width: "600px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} size="small">
              <TableHead sx={{ backgroundColor: "#ddd" }}>
                <TableRow>
                  <TableCell>Tecnologia</TableCell>
                  <TableCell>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {technologies.map((tech, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {tech.name}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={tech.link}
                        variant="body2"
                        underline="hover"
                        rel="noopener"
                        target="_blank"
                      >
                        {tech.link}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{ mr: 2, my: 1 }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
  AppBar,
  Drawer,
  Box,
  Toolbar,
  Typography,
  IconButton,
  // MenuItem,
  // Menu,
  List,
} from "@mui/material";

// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function Header() {
  const history = useHistory();
  const [toggleMenu, setToggleMenu] = useState(false);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Box sx={{ display: "flex", mb: 0.5 }}>
      <AppBar
        position="static"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Menu"
            title="Menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          >
            <MenuOutlinedIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "normal" }}
          >
            Fast CRUD
          </Typography>

          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="Dashboard"
              title="Dashboard"
              onClick={() => history.push("/home")}
              sx={{ mr: 6 }}
            >
              <DashboardOutlinedIcon />
            </IconButton>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="Usuários"
              title="Usuários"
              onClick={() => history.push("/users")}
              sx={{ mr: -1 }}
            >
              <PeopleAltOutlinedIcon />
            </IconButton>

            {/*<IconButton
              size="large"
              aria-label="Avatar"
              title="Avatar"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleOutlinedIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>*/}
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
            <IconButton
              sx={{ mt: 10, ml: 2 }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="Grupos"
              title="Grupos"
              onClick={() => {
                setToggleMenu(!toggleMenu);
                history.push("/groups");
              }}
            >
              <GroupsOutlinedIcon />
            </IconButton>
          </List>
          <List sx={{ width: "80px" }}>
            <IconButton
              sx={{ ml: 2 }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="Sobre"
              title="Sobre"
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            >
              <InfoOutlinedIcon />
            </IconButton>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

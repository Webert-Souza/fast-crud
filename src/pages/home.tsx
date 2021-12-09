import React from "react";

import Container from "@mui/material/Container";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import { PageHeader } from "../components/PageHeader";

export const Home = () => {
  const loadDashboard = () => {};

  const options = [
    {
      icon: RefreshOutlinedIcon,
      tooltip: "Atualizar",
      link: "",
      cb: loadDashboard,
    },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <PageHeader
          name="Dashboard"
          icon={DashboardOutlinedIcon}
          options={options}
        />
      </Container>
    </>
  );
};

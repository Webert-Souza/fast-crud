import React from "react";

import { useHistory } from "react-router-dom";

import {
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  SvgIcon,
} from "@mui/material";

import { SvgIconComponent } from "@mui/icons-material";

type Options = {
  icon: SvgIconComponent;
  tooltip: string;
  link: string;
  cb: any;
  disabled?: Boolean;
};

type Props = {
  name: string;
  icon: SvgIconComponent;
  options: Options[];
};

export const PageHeader = ({ name, icon, options }: Props) => {
  const history = useHistory();

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#1976d2",
          borderRadius: 10,
          mb: 1,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            sx={{ color: "white", cursor: "default" }}
          >
            <SvgIcon component={icon}></SvgIcon>
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white", fontWeight: "normal" }}
          >
            {name}
          </Typography>

          <div>
            {options.map((option, index) => (
              <Tooltip title={option.tooltip} arrow placement="bottom">
                <IconButton
                  key={index}
                  size="large"
                  edge="start"
                  aria-label={option.tooltip}
                  disabled={option.disabled ? true : false}
                  onClick={() => {
                    option.link ? history.push(option.link) : option.cb();
                  }}
                  sx={{ color: "white", ml: 1 }}
                >
                  <SvgIcon component={option.icon}></SvgIcon>
                </IconButton>
              </Tooltip>
            ))}
          </div>
        </Toolbar>
      </Box>
    </>
  );
};

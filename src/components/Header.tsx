import * as React from "react";

import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import LogoSVG from "./LogoSVG";
import {
  MenuButton,
  MenuWrap,
  StyledAppBar,
  StyledToolbar,
} from "../styles/Header.style";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import { setLogin } from "../reducers/auth";
import { useDispatch } from "react-redux";

const pages = ["Dashboard", "Market", "Portfolio"];

const props = {};

const Header = (props: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    const response: any = await logout();
    if (response.status === 200) {
      dispatch(
        setLogin({
          user: null,
          token: null,
        })
      );
      navigate(`/login`);
    }
  };

  const settings = [
    { label: "Profile" },
    { label: "Account" },
    { label: "Dashboard" },
    { label: "Logout", action: handleLogout },
  ];

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <LogoSVG />

        {/* Mobile section */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <LogoSVG isMobile />

        {/* middle section */}
        <MenuWrap sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <MenuButton
              key={page}
              isActive={pathname.includes(page.toLowerCase())}
              onClick={() => navigate(`/${page.toLowerCase()}`)}
            >
              {page}
            </MenuButton>
          ))}
        </MenuWrap>

        {/* Profile Icon */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map(({ label, action }) => (
              <MenuItem key={label} onClick={action}>
                <Typography textAlign="center">{label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;

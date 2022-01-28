import {
  ExpandMoreRounded,
  Notifications,
  PermIdentity,
  Settings,
} from '@mui/icons-material';
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  styled,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useContext, useEffect, useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { DrawerOpen } from '../../System';
import { drawerWidth } from './Menu';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/initialiseApp';
import { useNavigate } from 'react-router-dom';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CustomListItemText = styled(ListItemText)(() => ({
  fontSize: '20px',
  color: 'black.main',
}));

const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [open, dispatch] = useContext(DrawerOpen);
  const popOverOpen = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //SignOut when the logout button is pressed
  const handleLogOut = () => {
    signOut(auth);
    navigate('/');
  };
  // For PopOver
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = (event) => {
    setAnchorEl(null);
  };
  return (
    <AppBar color="status" position="fixed" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left HamBurger Menu */}
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={() => dispatch({ type: 'open' })}
          edge="start"
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon sx={{ fontSize: '30px' }} />
        </IconButton>

        {/* Right Group of Icons: Notification and Expand More */}
        <Toolbar sx={{ position: 'absolute', right: '20px' }}>
          <IconButton color="grey" aria-label="notification">
            <Notifications sx={{ fontSize: '30px' }} />
          </IconButton>
          <IconButton
            aria-describedby={id}
            color="primary"
            aria-label="notification"
            onClick={handlePopoverOpen}
          >
            <ExpandMoreRounded sx={{ fontSize: '30px' }} />
          </IconButton>

          {/* PopOver containng: Profile, settings & privacy, Logout */}
          <Popover
            id={id}
            open={popOverOpen}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <PermIdentity />
                </ListItemIcon>
                <CustomListItemText disableTypography primary="Profile" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <CustomListItemText
                  disableTypography
                  primary="Settings & Privacy"
                />
              </ListItemButton>
              <Divider />
              <ListItemButton
                onClick={handleLogOut}
                sx={{ textAlign: 'center' }}
              >
                <CustomListItemText disableTypography primary="Logout" />
              </ListItemButton>
            </List>
          </Popover>
          {/* Popover ends */}
        </Toolbar>
        {/* Right Group of Icons ends here */}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;

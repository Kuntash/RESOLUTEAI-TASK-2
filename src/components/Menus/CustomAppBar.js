import { ExpandMoreRounded, Notifications } from '@mui/icons-material';
import {
  IconButton,
  Popover,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useContext, useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { DrawerOpen } from '../../System';
import { drawerWidth } from './Menu';

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

const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, dispatch] = useContext(DrawerOpen);
  const popOverOpen = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // For PopOver
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = (event) => {
    setAnchorEl(null);
  };
  return (
    <AppBar color="status" position="fixed" open={open}>
      {/* Left HamBurger Menu */}
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
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

          {/* PopOver containng: logout, settings and profile  */}
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
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;

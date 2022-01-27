import { ChevronLeft, ChevronRight, Inbox, Mail } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import React, { useContext } from 'react';
import { DrawerOpen } from '../../System';
import { DrawerHeader, drawerWidth, openedMixin, closedMixin } from './Menu';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material';

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));
const CustomDrawer = () => {
  const theme = useTheme();
  const [open, dispatch] = useContext(DrawerOpen);
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <img
          style={{ maxWidth: '250px' }}
          src="../images/logo.png"
          alt="company logo"
        />
        <IconButton onClick={() => dispatch({ type: 'close' })}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {[
          'Dashboard',
          'Raise a Ticket',
          'History / Logs',
          'Analytics',
          'Settings',
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText sx={{ fontSize: '30px' }} primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;

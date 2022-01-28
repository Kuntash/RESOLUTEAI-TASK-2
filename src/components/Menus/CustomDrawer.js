import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { DrawerOpen } from '../../System';
import { DrawerHeader, drawerWidth, openedMixin, closedMixin } from './Menu';
import { drawerItemList } from './drawerItemList';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

// Custom Drawer
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
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
        {drawerItemList.map((data, index) => (
          <Link key={index} style={{ textDecoration: 'none' }} to={data.link}>
            <ListItemButton
              sx={{
                '&.Mui-selected': {
                  borderLeftColor: 'primary.main',
                  borderLeftWidth: '3px',
                  borderLeftStyle: 'solid',
                },
              }}
              key={data.text}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                sx={{
                  fontSize: '20px',
                  color: 'black.main',
                }}
                primary={data.text}
              />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default CustomDrawer;

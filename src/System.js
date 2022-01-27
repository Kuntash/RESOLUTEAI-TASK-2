import { Box, CssBaseline } from '@mui/material';
import { DrawerHeader } from './components/Menus/Menu';

import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useReducer } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import auth from './firebase/initialiseApp';
import { initialState, drawerOpenReducer } from './Contexts/drawerOpenReducer';
import CustomAppBar from './components/Menus/CustomAppBar';
import CustomDrawer from './components/Menus/CustomDrawer';

export const DrawerOpen = createContext({
  open: initialState,
  dispatch: () => null,
});

const System = () => {
  const [open, dispatch] = useReducer(drawerOpenReducer, initialState);
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    //If not logged in then, redirect to the login page.
    if (!user) navigate('/');
  });
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DrawerOpen.Provider value={[open, dispatch]}>
        {/* Top App Bar */}
        <CustomAppBar />

        {/* Side Drawer */}
        <CustomDrawer />
      </DrawerOpen.Provider>

      {/* Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default System;

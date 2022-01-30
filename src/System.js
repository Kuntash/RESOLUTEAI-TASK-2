import { Box, CssBaseline } from '@mui/material';
import { DrawerHeader } from './components/Menus/Menu';
import React, { createContext, useEffect, useReducer } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { initialState, drawerOpenReducer } from './Contexts/drawerOpenReducer';
import CustomAppBar from './components/Menus/CustomAppBar';
import CustomDrawer from './components/Menus/CustomDrawer';
import { useAuth } from './Contexts/authContext';
export const DrawerOpen = createContext({
  open: initialState,
  dispatch: () => null,
});

const System = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [open, dispatch] = useReducer(drawerOpenReducer, initialState);
  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Passing Global Drawer Open State to CustomAppBar and Side Drawer */}
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

import {
  AddCircle,
  Assessment,
  Book,
  Dashboard,
  Settings,
} from '@mui/icons-material';

const listItemSize = {
  fontSize: '30px',
};
export const drawerItemList = [
  {
    text: 'Dashboard',

    icon: <Dashboard sx={listItemSize} />,
    link: 'home',
  },
  {
    text: 'Raise a Ticket',
    icon: <AddCircle sx={listItemSize} />,
    link: 'createTicket',
  },
  {
    text: 'History / Logs',
    icon: <Book sx={listItemSize} />,
    link: 'history',
  },
  {
    text: 'Analytics',
    icon: <Assessment sx={listItemSize} />,
    link: 'analytics',
  },
  {
    text: 'Settings',
    icon: <Settings sx={listItemSize} />,
    link: 'settings',
  },
];

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
    link: '/dashboard/home',
  },
  {
    text: 'Raise a Ticket',
    icon: <AddCircle sx={listItemSize} />,
    link: '/dashboard/createTicket',
  },
  {
    text: 'History / Logs',
    icon: <Book sx={listItemSize} />,
    link: '/dashboard/history',
  },
  {
    text: 'Analytics',
    icon: <Assessment sx={listItemSize} />,
    link: '/dashboard/analytics',
  },
  {
    text: 'Settings',
    icon: <Settings sx={listItemSize} />,
    link: '/dashboard/settings',
  },
];

import { styled, useTheme } from '@mui/material';
import { Box, Grid } from '@mui/material';
import React from 'react';
import TableComponent from './TableComponent';
import TicketInfoCard from './TicketInfoCard';

// TODO: Calculate the Total Tickets, Open Tickets, Closed Tickets
const CustomGridContainer = styled(Grid)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  alignItems: 'center',
}));

const CustomBoxLeft = styled(Box)(() => ({
  gridColumnStart: '1',
  gridColumnEnd: '2',
  textAlign: 'left',
}));
const CustomBoxRight = styled(Box)(() => ({
  gridColumnStart: '4',
  gridColumnEnd: '-1',
  textAlign: 'right',

  '& h2': {
    fontWeight: '400',
  },
}));

const CustomBoxContainer = styled(Box)(() => ({
  marginTop: '20px',
  marginBottom: '30px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  columnGap: '30px',
}));

const Home = () => {
  const theme = useTheme();
  const ticketInfoList = [
    {
      backgroundColor: theme.palette.primary.main,
      title: 'Total Tickets',
      count: 6,
    },
    {
      backgroundColor: theme.palette.secondary.main,
      title: 'Open Tickets',
      count: 6,
    },
    {
      backgroundColor: theme.palette.tertiary.main,
      title: 'Closed Tickets',
      count: 6,
    },
  ];

  const date = new Date();
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const dateFormat = new Intl.DateTimeFormat('en-US', options).format(date);

  return (
    <Box>
      {/* Top Header */}
      <CustomGridContainer>
        <CustomBoxLeft>
          <h1>Dashboard</h1>
        </CustomBoxLeft>
        <CustomBoxRight>
          <h2>{dateFormat}</h2>
        </CustomBoxRight>
      </CustomGridContainer>
      <CustomBoxContainer>
        {/* Ticket Info Cards */}
        {ticketInfoList.map((data, index) => (
          <TicketInfoCard info={data} />
        ))}
      </CustomBoxContainer>

      <TableComponent />
    </Box>
  );
};

export default Home;

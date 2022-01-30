import { styled, useTheme } from '@mui/material';
import { Box, Grid } from '@mui/material';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/initialiseApp';
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
  //Get all the data from the Tickets Collection
  const [ticketList, setTicketList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalTickets, setTotalTickets] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);

  //Realtime updates for all tickets using onSnapshot inside a useEffect
  //listener to get all the tickets whenever tickets collection updates
  useEffect(
    () =>
      onSnapshot(collection(db, 'Tickets'), (ticketSnapshot) => {
        setLoading(true);
        const tickets = [];
        ticketSnapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          tickets.push({ ...data, id });
        });
        setTicketList(tickets);
        setTotalTickets(tickets.length);
        setLoading(false);
      }),
    []
  );

  //Listener to get all the open tickets whenever tickets collection updates
  useEffect(() => {
    const openTicketRef = query(
      collection(db, 'Tickets'),
      where('status', '==', 'open')
    );
    const unsub = onSnapshot(openTicketRef, (openTicketSnapshot) => {
      setLoading(true);
      setOpenTickets(openTicketSnapshot.size);
      setLoading(false);
    });
    return unsub;
  }, []);

  const theme = useTheme();

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
        <TicketInfoCard
          key={0}
          title="Total Tickets"
          backgroundColor={theme.palette.primary.main}
          count={!loading ? totalTickets : null}
        />
        <TicketInfoCard
          title="Open Tickets"
          key={1}
          count={!loading ? openTickets : null}
          backgroundColor={theme.palette.secondary.main}
        />
        <TicketInfoCard
          key={2}
          count={!loading ? totalTickets - openTickets : null}
          title="Closed Tickets"
          backgroundColor={theme.palette.tertiary.main}
        />
      </CustomBoxContainer>

      <TableComponent ticketList={ticketList} loading={loading} />
    </Box>
  );
};

export default Home;

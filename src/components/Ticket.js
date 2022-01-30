import { useTheme } from '@mui/material';
import { CloudDownload, Warning } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Paper, styled } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/initialiseApp';

const ContainerBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '20px',
}));
const CustomContainerPaper = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
const HeadingContainerBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px',
}));

const TopBox = styled(Box)(() => ({
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
}));
const BottomBox = styled(Box)(() => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));
const TextContainerBox = styled(Box)(() => ({
  display: 'flex',
  columnGap: '10px',

  '& p': {
    fontSize: '1.17em',
  },
}));
const Ticket = (props) => {
  const { id } = useParams();
  const [ticketDetails, setTicketDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  /*   Get the ticket document corresponding to the document id received from the useParams() */
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      const ticketRef = doc(db, 'Tickets', id);
      const ticketInfo = await getDoc(ticketRef);
      if (ticketInfo.exists()) {
        setTicketDetails(ticketInfo.data());
      }
      setLoading(false);
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <ContainerBox>
      <HeadingContainerBox>
        <h1>Ticket Details</h1>
        <IconButton color="primary">
          <CloudDownload sx={{ fontSize: '45px' }} />
        </IconButton>
      </HeadingContainerBox>
      <CustomContainerPaper elevation={3}>
        <TopBox>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              columnGap: '20px',
              alignItems: 'center',
              '& h2': {
                fontWeight: 400,
              },
            }}
          >
            <Warning
              sx={{
                fontSize: '50px',
                padding: '5px',
                color: 'white',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '50%',
              }}
            />

            <h2>
              Ticket Number: {!loading ? ticketDetails.ticketNumber : null}
            </h2>
          </Box>
          <Box>
            <Button variant="contained">OPEN</Button>
          </Box>
        </TopBox>
        <Divider />
        <BottomBox>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <TextContainerBox>
              <h3>Created By:</h3>
              <p>{!loading ? ticketDetails.creatorName : null}</p>
            </TextContainerBox>
            <TextContainerBox>
              <h3>Created On:</h3>
              <p>{!loading ? ticketDetails.createdDate : null}</p>
            </TextContainerBox>
            <TextContainerBox>
              <h3>Due Date:</h3>
              <p></p>
            </TextContainerBox>
          </Box>
          <Box>
            <TextContainerBox>
              <h3>Issue Title: </h3>
              <p>{!loading ? ticketDetails?.issue?.issueTitle : null}</p>
            </TextContainerBox>
            <TextContainerBox>
              <h3>Issue Description:</h3>
              <p>{!loading ? ticketDetails?.issue?.issueDescription : null}</p>
            </TextContainerBox>
          </Box>
        </BottomBox>
      </CustomContainerPaper>
    </ContainerBox>
  );
};

export default Ticket;

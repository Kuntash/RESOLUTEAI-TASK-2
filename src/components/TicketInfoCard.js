import { SupervisorAccountOutlined } from '@mui/icons-material';
import { Box, Paper, styled, useTheme } from '@mui/material';
import React from 'react';

const CustomPaper = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  overflow: 'hidden',
}));

const TicketInfoCard = ({ info }) => {
  const { backgroundColor, title, count } = info;
  const theme = useTheme();

  const LeftBox = styled(Box)(() => ({
    backgroundColor: theme.palette.grey.light,
    padding: '10px',
    flexBasis: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }));
  const RightBox = styled(Box)(() => ({
    padding: '10px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& p': {
      fontSize: '1.17em',
    },
  }));
  return (
    <CustomPaper>
      <LeftBox>
        <SupervisorAccountOutlined
          sx={{
            padding: '5px',
            margin: '15px',
            backgroundColor: backgroundColor,
            fontSize: '50px',
            color: 'white',
            borderRadius: '50%',
          }}
        />
      </LeftBox>
      <RightBox>
        <p>{title}</p>
        <h3>{count}</h3>
      </RightBox>
    </CustomPaper>
  );
};

export default TicketInfoCard;

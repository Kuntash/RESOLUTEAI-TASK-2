import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  styled,
  TextField,
} from '@mui/material';
import { useAuth } from '../Contexts/authContext';
import { db } from '../firebase/initialiseApp';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
const ContainerBox = styled(Box)(() => ({
  padding: '20px',
}));

const AccountDetailsPaper = styled(Paper)(() => ({
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '30px 20px',
  alignItems: 'center',
}));

const AccountOwnerBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  columnGap: '10px',

  '& p': {
    fontSize: '1.17em',
    fontWeight: '400',
  },
}));

const ContactDetailsPaper = styled(Paper)(() => ({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 30px',
  rowGap: '20px',

  '& h2': {
    fontWeight: 400,
  },
}));

const CustomTextField = styled(TextField)(() => ({
  flexBasis: '50%',
}));

const CustomBox = styled(Box)(() => ({
  display: 'flex',
  columnGap: '30px',
}));

const IssueContainerPaper = styled(Paper)(() => ({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 30px',
  rowGap: '20px',
}));

const ButtonBox = styled(Box)(() => ({
  marginTop: '20px',
  display: 'flex',
  columnGap: '30px',

  '& .MuiButton-root': {
    flexBasis: '50%',
    paddingTop: ' 10px',
    paddingBottom: '10px',
    textTransform: 'none',
  },
}));

const CreateTicket = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [contactPersonDetails, setContactPersonDetails] = useState({});
  const [issueAt, setIssueAt] = useState([]);
  const [issuePriority, setIssuePriority] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [ticket, setTicket] = useState({});
  const [issueSpottedDate, setIssueSpottedDate] = useState('');
  useEffect(() => {
    setTicket({
      contactPersonDetails,
      issue: {
        issueAt: issueAt,
        issueDescription: issueDescription,
        issueSpottedDate: issueSpottedDate,
        priority: issuePriority,
        issueTitle: issueTitle,
      },
      creatorEmail: currentUser?.email,
      creatorId: currentUser?.uid,
      creatorName: currentUser?.name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    issueAt,
    issuePriority,
    contactPersonDetails,
    issueDescription,
    issueSpottedDate,
    issueTitle,
  ]);

  const issueOptions = [
    'Machine 1',
    'Machine 2',
    'Machine 5',
    'GPU 1',
    'GPU 2',
    'GPU 5',
  ];

  const handleCreateTicket = async (e) => {
    setLoading(true);
    const createdDate = formatDate(new Date().toDateString());

    const ticketCountRef = doc(db, 'TicketCount', 'ticket');
    const ticketCountSnap = await getDoc(ticketCountRef);
    const ticketCount = ticketCountSnap.data();
    const ticketId = ticketCount.count + 1;
    const ticketNumber = 'WRAI' + ticketId;

    //Structuring Tickets document
    const ticketInfo = {
      ...ticket,
      ticketId,
      ticketNumber,
      createdDate,
      status: 'open',
    };

    //Update the ticketCount in TicketCount collection
    await updateDoc(ticketCountRef, {
      count: ticketId,
    });

    //Add the ticket in the Tickets collection
    const TicketsRef = await addDoc(collection(db, 'Tickets'), {
      ...ticketInfo,
    });
    setLoading(false);
  };

  const handleNameChange = (e) => {
    setContactPersonDetails((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  const handleEmailChange = (e) => {
    setContactPersonDetails((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };
  const handlePhoneChange = (e) => {
    setContactPersonDetails((prev) => ({
      ...prev,
      phoneNo: e.target.value,
    }));
  };

  // Issue At
  const handleIssueAtChange = (e) => {
    const {
      target: { value },
    } = e;
    setIssueAt(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const elevation = 3;
  return (
    <ContainerBox>
      <h1>Create New Ticket</h1>
      <AccountDetailsPaper elevation={elevation}>
        <AccountOwnerBox>
          <h3>Account Owner Name:</h3>
          <p>{currentUser?.name}</p>
        </AccountOwnerBox>
        <AccountOwnerBox>
          <h3>Account Owner Email:</h3>
          <p>{currentUser?.email}</p>
        </AccountOwnerBox>
      </AccountDetailsPaper>
      <ContactDetailsPaper elevation={elevation}>
        <h2>Contact Person Details</h2>
        <CustomBox>
          <CustomTextField
            color="primary"
            type="text"
            variant="outlined"
            label="Contact Person Name"
            onChange={handleNameChange}
          />
          <CustomTextField
            color="primary"
            type="email"
            variant="outlined"
            label="Contact Person Email"
            onChange={handleEmailChange}
          />
        </CustomBox>
        <CustomBox>
          <CustomTextField
            color="primary"
            type="tel"
            variant="outlined"
            label="Contact Person Phone"
            onChange={handlePhoneChange}
          />
        </CustomBox>
      </ContactDetailsPaper>

      <IssueContainerPaper elevation={elevation}>
        <CustomBox>
          {/* IssueAt options*/}
          <FormControl sx={{ flexBasis: '50%' }}>
            <InputLabel id="issueAt-checklist">Issue At</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={issueAt}
              onChange={handleIssueAtChange}
              input={<OutlinedInput label="Issue At" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {issueOptions.map((issue) => (
                <MenuItem key={issue} value={issue}>
                  <Checkbox checked={issueAt.indexOf(issue) > -1} />
                  <ListItemText primary={issue} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Issue priority */}
          <FormControl sx={{ flexBasis: '50%' }}>
            <InputLabel id="priority">Priority</InputLabel>
            <Select
              labelId="priority-menu-select"
              id="priority-menu-select"
              value={issuePriority}
              label="Priority"
              onChange={(e) => setIssuePriority(e.target.value)}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </CustomBox>
        <CustomBox>
          {/* Issue Date */}
          <CustomTextField
            variant="outlined"
            label="Issue Seen From"
            InputLabelProps={{
              shrink: true,
            }}
            value={issueSpottedDate}
            color="primary"
            type="date"
            onChange={(e) => setIssueSpottedDate(e.target.value)}
          />

          {/* Issue Overview */}
          <CustomTextField
            value={issueTitle}
            color="primary"
            type="text"
            variant="outlined"
            label="Issue Overview"
            onChange={(e) => setIssueTitle(e.target.value)}
          />
        </CustomBox>
        <CustomBox>
          <TextField
            sx={{ flexGrow: '1' }}
            value={issueDescription}
            minRows={3}
            multiline
            color="primary"
            onChange={(e) => setIssueDescription(e.target.value)}
            variant="outlined"
            type="text"
            label="Issue Description"
          />
        </CustomBox>
      </IssueContainerPaper>
      <ButtonBox>
        <Button variant="contained">Upload Attachments</Button>
        <Button variant="contained" onClick={handleCreateTicket}>
          Create Ticket
        </Button>
      </ButtonBox>
    </ContainerBox>
  );
};

export default CreateTicket;

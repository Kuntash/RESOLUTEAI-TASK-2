import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  OpenInNew,
} from '@mui/icons-material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

//Enables pagination functionalities in MUI's Table Component
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </Box>
  );
}

//Table Headings
const headings = [
  'Ticket Number',
  'Created By',
  'Created On',
  'Closing Date',
  'Status',
  'View Tickets',
];
const TableComponent = ({ ticketList, loading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [emptyRows, setEmptyRows] = useState(0);
  //Avoid a layout jump when reaching the last page with empty rows
  useEffect(() => {
    setEmptyRows(
      page > 0 ? Math.max(0, 1 + page * rowsPerPage - ticketList.length) : 0
    );
  }, [loading, page, rowsPerPage, ticketList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table">
      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ backgroundColor: '#efefef' }}>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                <b>Overview</b>
              </TableCell>
            </TableRow>
            <TableRow>
              {headings.map((heading, i) => (
                <TableCell key={i} align="center">
                  <b>{heading}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!loading ? (
            <TableBody>
              {(rowsPerPage > 0
                ? ticketList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : ticketList
              ).map((ticket, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{ticket.ticketNumber}</TableCell>
                  <TableCell align="center">{ticket.creatorEmail}</TableCell>
                  <TableCell align="center">{ticket.createdDate}</TableCell>
                  <TableCell align="center">{ticket?.closingDate}</TableCell>
                  <TableCell
                    align="center"
                    sx={
                      ticket.status === 'overdue'
                        ? {
                            backgroundColor: '#F62405',
                            color: '#fff',
                          }
                        : null
                    }
                  >
                    {ticket.status}
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      to={`/dashboard/ticket/${ticket.id}`}
                      
                      style={{ textDecoration: 'none' }}
                    >
                      <OpenInNew
                        sx={{
                          cursor: 'pointer',
                          color: '#F62405',
                          fontSize: '25px',
                        }}
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}

              {/* Blank Cells when available row is less than rowsPerPage*/}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          ) : null}
          {!loading ? (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={ticketList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          ) : null}
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;

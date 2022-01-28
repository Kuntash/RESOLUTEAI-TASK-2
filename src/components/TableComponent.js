import React from 'react';
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
const createRow = (
  ticketNumber,
  responsibleTeam,
  createdOn,
  closingDate,
  status
) => {
  return {
    ticketNumber,
    responsibleTeam,
    createdOn,
    closingDate,
    status,
  };
};

const headings = [
  'Ticket Number',
  'Responsible Team',
  'Created On',
  'Closing Date',
  'Status',
  'View Tickets',
];
const rows = [
  createRow('RAIJSJAN2201', 'Team A', '04-01-2022', '20-01-2022', 'open'),
  createRow('RAIJSJAN2202', 'Team B', '05-01-2022', '04-01-2022', 'closed'),
  createRow('RAIJSJAN2203', 'Team C', '06-01-2022', '10-01-2022', 'overdue'),
  createRow('RAIJSJAN2204', 'Team A', '07-01-2022', '20-01-2022', 'open'),
  createRow('RAIJSJAN2205', 'Team B', '08-01-2022', '10-01-2022', 'closed'),
  createRow('RAIJSJAN2206', 'Team C', '09-01-2022', '12-01-2022', 'overdue'),
  createRow('RAIJSJAN2207', 'Team A', '10-01-2022', '11-01-2022', 'closed'),
  createRow('RAIJSJAN2208', 'Team B', '11-01-2022', '20-01-2022', 'open'),
  createRow('RAIJSJAN2209', 'Team C', '12-01-2022', '15-01-2022', 'overdue'),
  createRow('RAIJSJAN2210', 'Team A', '13-01-2022', '20-01-2022', 'open'),
  createRow('RAIJSJAN2211', 'Team B', '14-01-2022', '15-01-2022', 'closed'),
  createRow('RAIJSJAN2212', 'Team C', '15-01-2022', '16-01-2022', 'overdue'),
  createRow('RAIJSJAN2213', 'Team A', '16-01-2022', '19-01-2022', 'closed'),
  createRow('RAIJSJAN2214', 'Team B', '17-01-2022', '19-01-2022', 'closed'),
  createRow('RAIJSJAN2215', 'Team C', '18-01-2022', '19-01-2022', 'closed'),
  createRow('RAIJSJAN2216', 'Team A', '19-01-2022', '22-01-2022', 'open'),
  createRow('RAIJSJAN2217', 'Team B', '20-01-2022', '23-01-2022', 'open'),
  createRow('RAIJSJAN2218', 'Team C', '21-01-2022', '24-01-2022', 'open'),
  createRow('RAIJSJAN2219', 'Team A', '22-01-2022', '25-01-2022', 'open'),
];
const TableComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Avoid a layout jump when reaching the last page with empty rows
  const emptyRows =
    page > 0 ? Math.max(0, 1 + page * rowsPerPage - rows.length) : 0;

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
                <b>LATEST ACTIVITY</b>
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
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => (
              <TableRow key={i}>
                <TableCell align="center">{row.ticketNumber}</TableCell>
                <TableCell align="center">{row.responsibleTeam}</TableCell>
                <TableCell align="center">{row.createdOn}</TableCell>
                <TableCell align="center">{row.closingDate}</TableCell>
                <TableCell
                  align="center"
                  sx={
                    row.status === 'overdue'
                      ? {
                          backgroundColor: '#F62405',
                          color: '#fff',
                        }
                      : null
                  }
                >
                  {row.status}
                </TableCell>
                <TableCell align="center">
                  <OpenInNew
                    sx={{
                      cursor: 'pointer',
                      color: '#F62405',
                      fontSize: '25px',
                    }}
                  />
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
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={rows.length}
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
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;

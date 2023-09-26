import React, { useEffect, useRef } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Grid, Typography } from "@material-ui/core";
import {makeStyles, Theme, createStyles, withStyles  } from '@material-ui/core/styles';

//redux 
import {useSelector, useDispatch} from 'react-redux'
import { getMoreLogsOnUserClick } from "../../../Redux-reducers/logsReducer";

//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableRow: {
      "&:hover": {
        backgroundColor: '#5ACBCC'
      }
    },
    tableContainer: {
      height:'640px',
      zIndex:0,
      [theme.breakpoints.down('md')]: {
        height: '315px',
      },
      [theme.breakpoints.down('sm')]: {
        height: '630px',
      }
    }
  }),
);

interface Column {
  id: 'date' | 'time' | 'category' | 'description'
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'date', label: 'Date', minWidth: 90 },
  { id: 'time', label: 'Time', minWidth: 90 },
  { id: 'category', label: 'Category', minWidth: 90},
  {
    id: 'description',
    label: 'Description',
    minWidth: 400,
    format: (value: number) => value.toLocaleString('en-US'),
  }
];

interface Log {
  date: string;
  time: string;
  category: string;
  description: string;
}
interface Props {
  logs: Log[] | []
}

const LogTable: React.FC <{logs:any, label:string, previousSkip:number, lastRawLog:any, setIsGettingMoreLogs:any , isGettingMoreLogs:boolean, fromRedux:any, toRedux:any, page:number, setPage:any, fromDatePicker:any, toDatePicker:any, rowsPerPage:any, setRowsPerPage:any, allLogsRetrieved:boolean}>= ({logs, label, previousSkip, lastRawLog, setIsGettingMoreLogs, isGettingMoreLogs, fromRedux, toRedux, page, setPage, fromDatePicker, toDatePicker, rowsPerPage, setRowsPerPage, allLogsRetrieved}) => {

  const ref = useRef<any>(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(()=>{
    ref.current.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
  },[page])

  const handleChangePage = (event: unknown, newPage: number) => {
    if(newPage > page && !isGettingMoreLogs && allLogsRetrieved === false){
      setIsGettingMoreLogs(true)
      dispatch(getMoreLogsOnUserClick(label, previousSkip, lastRawLog, fromRedux, toRedux));
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper  sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer className={classes.tableContainer}>
        <Table  stickyHeader aria-label="sticky table">
          <TableHead ref={ref} >
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  key={column.id}
                  align={column.align}
                  style={{ width: column.minWidth }}
                >
                  
                  {column.label}
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {logs
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log:any) => {
                return (
                  <TableRow className={classes.tableRow} tabIndex={-1} >
                    {columns.map((column) => {
                      const value = log[column.id];
                      return (
                        <TableCell key={column.id} >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {logs?.length === 0 ? <Grid xs={12} container direction="column" justifyContent="center" alignItems="center"><Typography>There are currently no logs.</Typography></Grid>  : null}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={logs?.length}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to}`}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


export default LogTable

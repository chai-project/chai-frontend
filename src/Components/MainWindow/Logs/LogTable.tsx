// import React, {useState} from 'react';
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// //mui
// import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { CssBaseline, Button, Paper, Box } from '@mui/material/';



// // redux
// import {useSelector, useDispatch} from 'react-redux'
// // import { initializeData } from './Redux-reducers/dataReducer';


// //types
// import chartDataType from '../../../Types/types'

// //components
// import SwitchButton from '../../Buttons/SwitchButton';
// import DatePickerComponent from './DatePickerComponent';

// // Styles 

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     main: {
//       //  boxSizing: 'border-box',
//        position: 'relative', //sitas!!!
//        width: '100%',
//        height: '100%',
//       //  background: '#CFD8DC',
//       //  left: '4%',
//       //  top: '10%',
//     },
//     datepicker:{
//       position: 'absolute',
//     }
//   }),
// );

// const Logs: React.FC = () => {
//     const color = "baxkground.default" // jeigu nauejs notifications tai kita spalva!
//     const classes = useStyles();
//     const dispatch = useDispatch()

// //   const getData = () => {
// //     dispatch(initializeData())
// //   }

//   return (
//     <Box className={classes.main} bgcolor="background.default">

//     </Box>
//   );
// };

// export default Logs;

// cia kita versija 

// import * as React from 'react';
import React, { useEffect, useRef } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import Box from 
// import { withStyles } from '@mui/material/styles';
import {makeStyles, Theme, createStyles, withStyles  } from '@material-ui/core/styles';

//redux 
import {useSelector, useDispatch} from 'react-redux'
import { getMoreLogsOnUserClick } from "../../../Redux-reducers/logsReducer";

//styles 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableRow: {
      // backgroundColor: 'red',
      // color: 'yellow',
      "&:hover": {
        backgroundColor: '#5ACBCC'
      }
    },
    tableContainer: {
      // position:'relative',
      height:'640px', //600fullscreen
      zIndex:0,
      [theme.breakpoints.down('md')]: {
        height: '315px', //780px
        // height: "100%"
        // minHeight: '650px',
      },
      [theme.breakpoints.down('sm')]: {
        height: '630px',
        // minHeight: '650px',
      }
      // overflow: 'hidden'
    }
  }),
);

// const StyledTableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white
//   },
//   body: {
//     fontSize: 12
//   }
// }))(TableCell);
// const styles = theme => ({
//   root: {
//     width: "100%",
//     marginTop: theme.spacing.unit * 3,
//     overflowX: "auto"
//   },
//   table: {
//     minWidth: 700
//   },
//   tableRow: {
//     "&$hover:hover": {
//       backgroundColor: "blue"
//     }
//   },
//   tableCell: {
//     "$hover:hover &": {
//       color: "pink"
//     }
//   },
//   hover: {}
// });

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
    // align: 'right', //atcomentuoti jeigu kevinas sutinka
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

const LogTable: React.FC <{logs:any, label:string, previousSkip:number, lastRawLog:any, setIsGettingMoreLogs:any , isGettingMoreLogs:boolean, fromRedux:any, toRedux:any, page:number, setPage:any, fromDatePicker:any, toDatePicker:any}>= ({logs, label, previousSkip, lastRawLog, setIsGettingMoreLogs, isGettingMoreLogs, fromRedux, toRedux, page, setPage, fromDatePicker, toDatePicker}) => {
  // const {logs} = props;
  // const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const ref = useRef<any>(null);

  const classes = useStyles();
  const dispatch = useDispatch() //redux

  useEffect(()=>{
    ref.current.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
  },[page])

  const handleChangePage = (event: unknown, newPage: number) => {
    // ref.current.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' });
    // ref.current && ref.current.scrollIntoView();
    // console.log(from,to)
    if(newPage > page && !isGettingMoreLogs ){
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
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // cia probelema su duplication !
              .map((log:any) => {
                return (
                  <TableRow className={classes.tableRow} tabIndex={-1} > {/* key={log.id} cia ir buvo problema del to ir duplikuodavosi*/}
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
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={logs?.length} //-1 or 0 logs?.length
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

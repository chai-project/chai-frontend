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

import * as React from 'react';
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
      position:'relative',
      height:'640px', //600fullscreen
      zIndex:0,
      [theme.breakpoints.down('md')]: {
        height: '780px',
        // minHeight: '650px',
      },
      [theme.breakpoints.down('sm')]: {
        height: '460px',
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
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'time', label: 'Time', minWidth: 100 },
  { id: 'category', label: 'Category', minWidth: 100},
  {
    id: 'description',
    label: 'Description',
    minWidth: 370,
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

const LogTable: React.FC <{logs:any}>= ({logs}) => {
  // const {logs} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const classes = useStyles();
  // const dispatch = useDispatch() //redux

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer className={classes.tableContainer}>  
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  key={column.id}
                  align={column.align}
                  // style={{ minWidth: column.minWidth }}
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
        count={logs?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


export default LogTable

// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

// interface Column {
//   id: 'date' | 'time' | 'description';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: 'date', label: 'Date', minWidth: 170 },
//   { id: 'time', label: 'Time', minWidth: 100 },
//   { id: 'description', label: 'Description', minWidth: 100 },
// ];

// interface Data {
//   date: string;
//   time: string;
//   description: string;
// }

// function createData(
//   date: string,
//   time: string,
//   description: string,
// ): Data {
//   return { date, time, description };
// }

// // const rows = [
// //   createData('2002-04-12', '14:22', "SWX1"),
// //   createData('2002-04-12', '14:22', "SWX2"),
// //   createData('2002-04-12', '14:22', "SWX3"),
// //   createData('2002-04-12', '14:22', "SWX4"),
// //   createData('2002-04-12', '14:22', "SWX5"),
// //   createData('2002-04-12', '14:22', "SWX6"),
// //   createData('2002-04-12', '14:22', "SWX7"),
// //   createData('2002-04-12', '14:22', "SWX8"),
// //   createData('2002-04-12', '14:22', "SWX9"),
// //   createData('2002-04-12', '14:22', "SWX10"),
// //   createData('2002-04-12', '14:22', "SWX11"),
// //   createData('2002-04-12', '14:22', "SWX12"),
// //   createData('2002-04-12', '14:22', "SWX13"),
// //   createData('2002-04-12', '14:22', "SWX14"),
// //   createData('2002-04-12', '14:22', "SWX15"),
// //   createData('2002-04-12', '14:22', "SWX16"),
// //   createData('2002-04-12', '14:22', "SWX17"),
// //   createData('2002-04-12', '14:22', "SWX18"),
// //   createData('2002-04-12', '14:22', "SWX19"),
// //   createData('2002-04-12', '14:22', "SWX20"),
// //   createData('2002-04-12', '14:22', "SWX21"),
// //   createData('2002-04-12', '14:22', "SWX22"),
// //   createData('2002-04-12', '14:22', "SWX23"),
// //   createData('2002-04-12', '14:22', "SWX24"),
// //   createData('2002-04-12', '14:22', "SWX25"),

// // ];
// const rows = [
//   { id: 1, date: 'Snow', time: 'Jon', description: '35' },
//   { id: 2, date: 'Lannister', time: 'Cersei', description: '42' },
//   { id: 3, date: 'Lannister', time: 'Jaime', description: '45' },
//   { id: 4, date: 'Stark', time: 'Arya', description: '16' },
//   { id: 5, date: 'Targaryen', time: 'Daenerys', description: 'null' },
//   { id: 6, date: 'Melisandre', time: 'null', description: '150' },
//   { id: 7, date: 'Clifford', time: 'Ferrara', description: '44' },
//   { id: 8, date: 'Frances', time: 'Rossini', description: '56' },
//   { id: 9, date: 'Roxie', time: 'Harvey', description: '65' },
//   { id: 10, date: 'Roxie', time: 'Harvey', description: '65' },
//   { id: 11, date: 'Roxie', time: 'Harvey', description: '65' },
// ];

// interface Log {
//   date:string;
//   time: string;
//   description: string;

// }
// interface Props {
//   logs: Log[] | []
// }
// const StickyHeadTable: React.FC<Props>= (props:Props) => {
//   const {logs} = props;
//   console.log("SWX", rows)
//   console.log("SWX", logs)
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.id}> 
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }

// export default StickyHeadTable

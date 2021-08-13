import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function createData(x, y1, y2, y3, y4) {
  return { x, y1, y2, y3, y4 };
}

const rows = [
  createData('date-time', 'number', 'number', 'number', '...'),
  createData('...', '...', '...', '...', '...'),
];

export default () => {
const classes = useTheme();

return (
  
    <Table className={classes.table} style={{maxWidth: '75vw', paddingTop: '2rem'}} size="small" aria-label="simple table">
      <caption>^Example of input csv data</caption>
      <TableHead>
        <TableRow>
          <TableCell>Date-Time</TableCell>
          <TableCell align="right">Dependent Variable 1</TableCell>
          <TableCell align="right">Dependent Variable 2</TableCell>
          <TableCell align="right">Dependent Variable 3</TableCell>
          <TableCell align="right">...</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell component="th" scope="row">
              {row.x}
            </TableCell>
            <TableCell align="right">{row.y1}</TableCell>
            <TableCell align="right">{row.y2}</TableCell>
            <TableCell align="right">{row.y3}</TableCell>
            <TableCell align="right">{row.y4}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

);
}
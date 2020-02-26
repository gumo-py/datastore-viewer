import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles({
    table: {
        width: 750,
    },
    tableHeader: {
        fontSize: 12
    },
    tableCell: {
        color: grey[700],
        fontSize: 12
    }
});

interface EntityInfoProps {
    kind: string;
    entityKey: string;
    keyLiteral: string;
}

export default function DenseTable(props: EntityInfoProps) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
            <TableRow key={'kind'}>
              <TableCell className={classes.tableHeader} component="th" scope="row">
                {'Kind'}
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                  {props.kind}
              </TableCell>
            </TableRow>
            <TableRow key={'key'}>
              <TableCell className={classes.tableHeader} component="th" scope="row">
                {'キー'}
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                  {props.entityKey}
              </TableCell>
            </TableRow>
            <TableRow key={'keyLiteral'}>
              <TableCell className={classes.tableHeader} component="th" scope="row">
                {'キーのリテラル'}
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                  {props.keyLiteral}
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
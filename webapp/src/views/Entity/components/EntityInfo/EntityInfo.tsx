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


export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
            <TableRow key={'nameSpace'}>
              <TableCell className={classes.tableHeader} component="th" scope="row">
                {'名前空間'}
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                  {'[デフォルト]'}
              </TableCell>
            </TableRow>
            <TableRow key={'kind'}>
              <TableCell className={classes.tableHeader} component="th" scope="row">
                {'Kind'}
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                  {'Project'}
              </TableCell>
            </TableRow>
            <TableRow key={'key'}>
              <TableCell className={classes.tableHeader} component="th" scope="row">
                {'キー'}
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                  {'Project name:3exmxvfn2nbktklxerll7agmme'}
              </TableCell>
            </TableRow>
            <TableRow key={'keyLiteral'}>
              <TableCell className={classes.tableHeader} component="th" scope="row">
                {'キーのリテラル'}
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                  {'Key(Project, \'3exmxvfn2nbktklxerll7agmme\')'}
              </TableCell>
            </TableRow>
            <TableRow key={'URL'}>
              <TableCell className={classes.tableHeader} component="th" scope="row">
                {'URL セーフキー'}
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                  {'ahNufnRvZG8td2l0aG91dC1ndW1vcicLEgdQcm9qZWN0IhozZXhteHZmbjJuYmt0a2x4ZXJsbDdhZ21tZQw'}
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
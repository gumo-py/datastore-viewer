import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';


function createData(name: string, id: string) {
  return { name, id };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          position: 'absolute',
          width: 700,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
      },
      title: {
          fontSize: 20,
          marginBottom: theme.spacing(1.5),
      },
      table: {
        minWidth: 650,
      },
      tableHeader: {
          color: 'grey',
      },
  }),
);

interface Props {
    ProjectList: Array<Project> | undefined;
    setProjectName(name: string): void;
    setModalState(state: boolean): void;
}

export default function ProjectListModal(props: Props) {
  const classes = useStyles();
  const rows: Array<any> = [];

  if(props.ProjectList) {
      props.ProjectList.forEach((part) => {
          rows.push(createData(part.project_name, part.project_id))
      });
  }

  const handleClick = (name: string) => {
    props.setProjectName(name);
    props.setModalState(false);
  };

  return (
      <div className={classes.root}>
          <div className={classes.title}>{'プロジェクトの選択'}</div>
          <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                  <TableRow>
                      <TableCell className={classes.tableHeader} align="left">{'name'}</TableCell>
                      <TableCell className={classes.tableHeader} align="left">{'id'}</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {rows.map(row => (
                      <TableRow
                          hover
                          key={row.name}
                      >
                          <TableCell align="left">
                              <Link style={{ color: 'black' }} onClick={ () => handleClick(row.name) }>
                                  {row.name}
                              </Link>
                          </TableCell>
                          <TableCell align="left">{row.id}</TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </div>
  );
}
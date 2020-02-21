import React from 'react';
import * as _ from "underscore";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { NavLink } from "react-router-dom";

const dummyData = {
    "entityResults": [
      {
        "entity": {
          "key": {
            "partitionId": {
              "projectId": "todo-without-gumo"
            },
            "path": [
              {
                "kind": "Project",
                "name": "3exmxvfn2nbktklxerll7agmme"
              }
            ]
          },
          "properties": {
            "name": {
              "stringValue": "testProject2"
            },
            "created_at": {
              "timestampValue": "2020-01-13T06:55:44.712535Z"
            },
          }
        },
        "version": "1578898544746000"
      },
      {
        "entity": {
          "key": {
            "partitionId": {
              "projectId": "todo-without-gumo"
            },
            "path": [
              {
                "kind": "Project",
                "name": "af65f2dxojbqphgacodj5nn4ua"
              }
            ]
          },
          "properties": {
            "name": {
              "stringValue": "testProject4"
            },
            "created_at": {
              "timestampValue": "2020-01-27T14:30:02.521096Z"
            }
          }
        },
        "version": "1580135402557000"
      },
      {
        "entity": {
          "key": {
            "partitionId": {
              "projectId": "todo-without-gumo"
            },
            "path": [
              {
                "kind": "Project",
                "name": "hswr2nefzbfinnkhyr2tsk3lqy"
              }
            ]
          },
          "properties": {
            "name": {
              "stringValue": "testProject1"
            },
            "created_at": {
              "timestampValue": "2020-01-13T06:55:38.115756Z"
            },

          }
        },
        "version": "1578898538149000"
      },
      {
        "entity": {
          "key": {
            "partitionId": {
              "projectId": "todo-without-gumo"
            },
            "path": [
              {
                "kind": "Project",
                "name": "lkbsc5462jashe46xqbys3dwyy"
              }
            ]
          },
          "properties": {
            "name": {
              "stringValue": "testProject3"
            },
            "created_at": {
              "timestampValue": "2020-01-27T14:29:52.927667Z"
            }
          }
        },
        "version": "1580135393092000"
      },
      {
        "entity": {
          "key": {
            "partitionId": {
              "projectId": "todo-without-gumo"
            },
            "path": [
              {
                "kind": "Project",
                "name": "ltdi4w5rhjh5lluvmw2mln6gpm"
              }
            ]
          },
          "properties": {
            "name": {
              "stringValue": "testProject5"
            },
            "created_at": {
              "timestampValue": "2020-01-27T14:30:14.320762Z"
            },
          }
        },
        "version": "1580135414366000"
      },
      {
        "entity": {
          "key": {
            "partitionId": {
              "projectId": "todo-without-gumo"
            },
            "path": [
              {
                "kind": "Project",
                "name": "s2ohskoeabdojpklwzsxinobua"
              }
            ]
          },
          "properties": {
            "name": {
              "stringValue": "testProject6"
            },
            "created_at": {
              "timestampValue": "2020-01-27T14:30:24.288051Z"
            }
          }
        },
        "version": "1580135424355000"
      }
    ],
};

interface HeadCell {
  id: string;
  label: string;
}

function convertData(entities: any) {
  const headCells: HeadCell[] = [ { id: 'id', label: '名前/ID' } ];
  Object.keys(entities[0].entity.properties).forEach(function (key) {
    headCells.push({ id: key, label: key });
  });

  const rows: Data[] = [];

  for(let data of entities) {
    const name_id: string = data.entity.key.path[data.entity.key.path.length-1].name;
    const properties: { [key:string] : any } = {};
    Object.keys(data.entity.properties).map( value => {
        properties[value] = Object.values(data.entity.properties[value]);
    });
    rows.push(createData(name_id, properties));
  }

  return { headCells, rows }
}

const { headCells, rows } = convertData(dummyData.entityResults);

interface Data {
  name_id: string;
  properties: {
    [key: string]: any
  };
}

function createData(
    name_id: string,
    properties: any
): Data {
  return {name_id, properties};
}

type Order = 'asc' | 'desc';


interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{backgroundColor:'lightgrey'}}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{fontWeight:'bolder'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    link: {
      color: 'black',
    },
  }),
);



export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('id');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const stableSort = (order: Order) => {
    if(order === 'asc') {
      if(orderBy !== 'name_id') {
        return _.sortBy(rows, (row) => {return row.properties[orderBy]});
      }else {
        return _.sortBy(rows, (row) => {return row[orderBy]});
      }
    } else {
      if(orderBy !== 'name_id') {
        return _.sortBy(rows, (row) => {return row.properties[orderBy]}).reverse();
      }else {
        return _.sortBy(rows, (row) => {return row[orderBy]}).reverse();
      }
    }
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(order)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <NavLink className={classes.link} to={`/edit/update/${row.name_id}`} >{row.name_id}</NavLink>
                      </TableCell>
                      {
                        Object.keys(row.properties).map( value => {
                          return <TableCell key={value} align="left">{ row.properties[value] }</TableCell>
                        })
                      }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
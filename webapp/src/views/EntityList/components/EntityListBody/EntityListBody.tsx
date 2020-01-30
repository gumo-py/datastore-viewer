import React from 'react';
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

const dummyData = {

  "batch": {
    "entityResultType": "FULL",
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
            "created_at": {
              "timestampValue": "2020-01-13T06:55:44.712535Z"
            },
            "name": {
              "stringValue": "testProject2"
            }
          }
        },
        "cursor": "CkQSPmoTbn50b2RvLXdpdGhvdXQtZ3Vtb3InCxIHUHJvamVjdCIaM2V4bXh2Zm4ybmJrdGtseGVybGw3YWdtbWUMGAAgAA==",
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
        "cursor": "CkQSPmoTbn50b2RvLXdpdGhvdXQtZ3Vtb3InCxIHUHJvamVjdCIaYWY2NWYyZHhvamJxcGhnYWNvZGo1bm40dWEMGAAgAA==",
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
            "created_at": {
              "timestampValue": "2020-01-13T06:55:38.115756Z"
            },
            "name": {
              "stringValue": "testProject1"
            }
          }
        },
        "cursor": "CkQSPmoTbn50b2RvLXdpdGhvdXQtZ3Vtb3InCxIHUHJvamVjdCIaaHN3cjJuZWZ6YmZpbm5raHlyMnRzazNscXkMGAAgAA==",
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
        "cursor": "CkQSPmoTbn50b2RvLXdpdGhvdXQtZ3Vtb3InCxIHUHJvamVjdCIabGtic2M1NDYyamFzaGU0NnhxYnlzM2R3eXkMGAAgAA==",
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
            "created_at": {
              "timestampValue": "2020-01-27T14:30:14.320762Z"
            },
            "name": {
              "stringValue": "testProject5"
            }
          }
        },
        "cursor": "CkQSPmoTbn50b2RvLXdpdGhvdXQtZ3Vtb3InCxIHUHJvamVjdCIabHRkaTR3NXJoamg1bGx1dm13Mm1sbjZncG0MGAAgAA==",
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
        "cursor": "CkQSPmoTbn50b2RvLXdpdGhvdXQtZ3Vtb3InCxIHUHJvamVjdCIaczJvaHNrb2VhYmRvanBrbHd6c3hpbm9idWEMGAAgAA==",
        "version": "1580135424355000"
      }
    ],
    "endCursor": "CkQSPmoTbn50b2RvLXdpdGhvdXQtZ3Vtb3InCxIHUHJvamVjdCIaczJvaHNrb2VhYmRvanBrbHd6c3hpbm9idWEMGAAgAA==",
    "moreResults": "NO_MORE_RESULTS"
  }
};

interface Data {
  id: string;
  created_at: string;
  name: string;
}

function createData(
  id: string,
  created_at: string,
  name: string,
): Data {
  return { id, created_at, name };
}

const rows = [
  createData('hswr2nefzbfinnkhyr2tsk3lqy', '2020-01-13T06:55:38.115756Z', 'testProject1'),
  createData('3exmxvfn2nbktklxerll7agmme', '2020-01-13T06:55:44.712535Z', 'testProject2'),
  createData('lkbsc5462jashe46xqbys3dwyy', '2020-01-27T14:29:52.927667Z', 'testProject3'),
  createData('af65f2dxojbqphgacodj5nn4ua', '2020-01-27T14:30:02.521096Z', 'testProject4'),
  createData('ltdi4w5rhjh5lluvmw2mln6gpm', '2020-01-27T14:30:14.320762Z', 'testProject5'),
  createData('s2ohskoeabdojpklwzsxinobua', '2020-01-27T14:30:24.288051Z', 'testProject6'),
];

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

type Order = 'asc' | 'desc';

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'id', numeric: false, disablePadding: true, label: '名前/ID' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'created_at' },
  { id: 'name', numeric: false, disablePadding: false, label: 'name' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
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
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
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
  }),
);

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
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
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.created_at}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
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
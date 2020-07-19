import React from 'react';
import * as _ from 'underscore';
import { useTranslation } from 'react-i18next';
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
import { NavLink } from 'react-router-dom';
import { EntityCollection, EntityObject } from '../../../../domain/Entity';
import { Domain } from '../../../../api-types';

type HeadCell = {
  id: string;
  label: string;
  index: boolean;
};

type Data = {
  name_id: string;
  kind: string;
  urlSafeKey: string;
  parent: any;
  properties: property;
};

type property = {
  [key: string]: any;
};

function createData(
  name_id: string,
  kind: string,
  parent: any,
  urlSafeKey: string,
  properties: any,
): Data {
  return { name_id, kind, parent, urlSafeKey, properties };
}

function convertData(entities: EntityObject[]) {
  const rows: Data[] = [];

  for (const entity of entities) {
    const name_id = String(entity.key.getIdOrName());
    const kind: string = entity.key.getKind();
    const parent: string = entity.key.getParent().toString();
    const urlSafeKey: string = entity.URLSafeKey;
    const properties: { [key: string]: any } = {};

    for (const property of entity.properties) {
      properties[property.property_name] = {
        value: property.toStr(),
        index: property.index,
      };
    }
    rows.push(createData(name_id, kind, parent, urlSafeKey, properties));
  }
  return rows;
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
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 200,
    },
    cell: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 200,
    },
  }),
);

type Order = 'asc' | 'desc';

type EnhancedTableProps = {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCellIds: HeadCell[];
  headCellProperties: HeadCell[];
};

const EnhancedTableHead: React.FunctionComponent<EnhancedTableProps> = ({
  classes,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  order,
  orderBy,
  rowCount,
  headCellIds,
  headCellProperties,
}) => {
  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>,
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ backgroundColor: 'lightgrey' }}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCellIds.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align="left"
              padding="default"
              sortDirection={orderBy === headCell.id ? order : false}
              style={{ fontWeight: 'bolder' }}>
              {/* <TableSortLabel */}
              {/*  active={orderBy === headCell.id} */}
              {/*  direction={orderBy === headCell.id ? order : 'asc'} */}
              {/*  onClick={createSortHandler(headCell.id)} */}
              {/* > */}
              {headCell.label}
              {/*  {orderBy === headCell.id ? ( */}
              {/*    <span className={classes.visuallyHidden}> */}
              {/*      {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
              {/*    </span> */}
              {/*  ) : null} */}
              {/* </TableSortLabel> */}
            </TableCell>
          );
        })}
        {headCellProperties.map((headCell) => {
          if (headCell.index) {
            return (
              <TableCell
                key={headCell.id}
                align="left"
                padding="default"
                sortDirection={orderBy === headCell.id ? order : false}
                style={{ fontWeight: 'bolder' }}>
                {/* <TableSortLabel */}
                {/*  active={orderBy === headCell.id} */}
                {/*  direction={orderBy === headCell.id ? order : 'asc'} */}
                {/*  onClick={createSortHandler(headCell.id)} */}
                {/* > */}
                {headCell.label}
                {/*  {orderBy === headCell.id ? ( */}
                {/*    <span className={classes.visuallyHidden}> */}
                {/*      {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
                {/*    </span> */}
                {/*  ) : null} */}
                {/* </TableSortLabel> */}
              </TableCell>
            );
          }
          return (
            <TableCell
              key={headCell.id}
              align="left"
              padding="default"
              sortDirection={orderBy === headCell.id ? order : false}
              style={{ fontWeight: 'bolder', color: 'grey' }}>
              {/* <TableSortLabel */}
              {/*  active={orderBy === headCell.id} */}
              {/*  direction={orderBy === headCell.id ? order : 'asc'} */}
              {/*  onClick={createSortHandler(headCell.id)} */}
              {/* > */}
              {headCell.label}
              {/*  {orderBy === headCell.id ? ( */}
              {/*    <span className={classes.visuallyHidden}> */}
              {/*      {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
              {/*    </span> */}
              {/*  ) : null} */}
              {/* </TableSortLabel> */}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

type Props = {
  entityCollection?: EntityCollection;
  lang: string;
  projectName: string;
  kindObj?: Domain.KindResult;
  page: number;
  rowsPerPage: number;
  setPage: (pageNumber: number) => void;
  setSelectedItems: (selected: string[]) => void;
};

export const EntityListBody: React.FunctionComponent<Props> = ({
  entityCollection,
  lang,
  projectName,
  kindObj,
  page,
  rowsPerPage,
  setPage,
  setSelectedItems,
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('id');
  const [selected, setSelected] = React.useState<string[]>([]);
  const properties = entityCollection?.properties;
  const rows = convertData(entityCollection?.entities || []);
  const [t, i18n] = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  React.useEffect(() => {
    setSelected([]);
  }, [kindObj, entityCollection]);

  React.useEffect(() => {
    setSelectedItems(selected);
  }, [selected]);

  const headCellIds: HeadCell[] = [
    {
      id: 'id',
      label: `${t('EntityList.EntityListBody.HeadCell.nameId')}`,
      index: true,
    },
  ];
  const headCellProperties: HeadCell[] = [];
  if (rows.length && rows[0].parent) {
    headCellIds.push({
      id: 'parent',
      label: `${t('EntityList.EntityListBody.HeadCell.parent')}`,
      index: true,
    });
  }
  if (properties?.length) {
    properties.forEach((property) => {
      headCellProperties.push({
        id: property.name,
        label: property.name,
        index: property.index,
      });
    });
  }

  const stableSort = (orders: Order) => {
    if (orders === 'asc') {
      if (orderBy !== 'name_id') {
        return _.sortBy(rows, (row) => {
          return row.properties[orderBy];
        });
      }
      return _.sortBy(rows, (row) => {
        return row[orderBy];
      });
    }
    if (orderBy !== 'name_id') {
      return _.sortBy(rows, (row) => {
        return row.properties[orderBy];
      }).reverse();
    }
    return _.sortBy(rows, (row) => {
      return row[orderBy];
    }).reverse();
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.urlSafeKey);
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

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCellIds={headCellIds}
              headCellProperties={headCellProperties}
            />
            <TableBody>
              {stableSort(order)
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.urlSafeKey);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.urlSafeKey)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.urlSafeKey}
                      selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        <NavLink
                          className={classes.link}
                          to={`/datastore_viewer/edit/update/${projectName}/${row.kind}/${row.urlSafeKey}`}>
                          {row.name_id}
                        </NavLink>
                      </TableCell>
                      {row.parent && (
                        <TableCell
                          className={classes.cell}
                          key={row.parent}
                          align="left">
                          {row.parent}
                        </TableCell>
                      )}
                      {headCellProperties.map((property) => {
                        if (row.properties[property.id]) {
                          return (
                            <TableCell
                              className={classes.cell}
                              key={property.id}
                              align="left">
                              {row.properties[property.id].value}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            className={classes.cell}
                            key={property.id}
                            align="left"
                          />
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={entityCollection?.totalCount || -1}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
        />
      </Paper>
    </div>
  );
};

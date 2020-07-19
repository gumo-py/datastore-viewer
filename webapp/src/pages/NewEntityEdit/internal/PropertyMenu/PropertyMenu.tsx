import React from 'react';
import * as _ from 'underscore';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { PropertyObject } from '../../../../domain/Property';

const useMenuItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      outline: 'solid 1px lightgrey',
    },
    itemName: {
      fontSize: 14,
    },
    inputFont: {
      fontSize: 13,
    },
    inputSelect: {
      fontSize: 13,
      marginTop: theme.spacing(1),
    },
    textField: {
      width: '100%',
    },
    select: {
      height: 30,
      paddingTop: 0,
      paddingBottom: 0,
    },
    cardButtons: {
      textAlign: 'right',
    },
  }),
);

interface PropertyProps {
  name: string;
  type: string;
  value: any;
  index: boolean;
  lang?: string;
  DeleteHandler?: (name: string) => void;
  SaveHandler?: (props: PropertyProps) => void;
}

const PropertyItem: React.FC<PropertyProps> = (props) => {
  const classes = useMenuItemStyles();
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState(props.type);
  const [name, setName] = React.useState(props.name);
  const [value, setValue] = React.useState(props.value);
  const [checkState, setCheckState] = React.useState(props.index);
  const [t, i18n] = useTranslation();

  React.useEffect(() => {
    if (props.lang) i18n.changeLanguage(props.lang);
  }, [props.lang, i18n]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleDeleteButton = () => {
    if (props.DeleteHandler) {
      props.DeleteHandler(name);
    }
  };
  const handleSave = () => {
    if (props.SaveHandler) {
      const newProperty = {
        name,
        type,
        value,
        index: checkState,
      };
      props.SaveHandler(newProperty);
      setOpen(!open);
    }
  };
  const handleCancel = () => {
    setName(props.name);
    setType(props.type);
    setValue(props.value);
    setCheckState(props.index);
    setOpen(!open);
  };
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };
  const handleCheckBoxChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setCheckState(!checkState);
  };
  const handleFormValueChange = (event: React.ChangeEvent<{ value: any }>) => {
    setValue(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<{ value: any }>) => {
    setName(event.target.value);
  };
  const makeTitle = () => {
    if (!name) {
      return t('EntityEdit.PropertyMenu.PropertyItem.empty');
    }
    if (!value) {
      if (type === 'Null') {
        return `${name}`;
      }
      return `${name}: ${t('EntityEdit.PropertyMenu.PropertyItem.empty')}`;
    }
    return `${name}: ${value}`;
  };

  React.useEffect(() => {
    if (type === 'Date') {
      setValue(moment(value).format('YYYY-MM-DDThh:mm'));
    }
  }, [value, type]);

  const formAdjuster = (types: string) => {
    switch (types) {
      case 'String':
        return (
          <TextField
            required
            value={value}
            onChange={handleFormValueChange}
            size="small"
            multiline
            InputLabelProps={{ shrink: true }}
            InputProps={{ classes: { input: classes.inputFont } }}
            className={classes.textField}
            label={t('EntityEdit.PropertyMenu.PropertyItem.value')}
            variant="outlined"
          />
        );

      case 'Date':
        return (
          <TextField
            required
            value={value}
            onChange={handleFormValueChange}
            type="datetime-local"
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{ classes: { input: classes.inputFont } }}
            className={classes.textField}
            label={t('EntityEdit.PropertyMenu.PropertyItem.value')}
            variant="outlined"
          />
        );

      case 'Integer':
        return (
          <TextField
            required
            value={value}
            onChange={handleFormValueChange}
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{ classes: { input: classes.inputFont } }}
            className={classes.textField}
            label={t('EntityEdit.PropertyMenu.PropertyItem.value')}
            variant="outlined"
          />
        );

      case 'Float':
        return (
          <TextField
            required
            value={value}
            onChange={handleFormValueChange}
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{ classes: { input: classes.inputFont } }}
            className={classes.textField}
            label={t('EntityEdit.PropertyMenu.PropertyItem.value')}
            variant="outlined"
          />
        );

      case 'Boolean':
        return (
          <TextField
            required
            select
            className={classes.textField}
            SelectProps={{ classes: { select: classes.select } }}
            InputLabelProps={{ shrink: true }}
            InputProps={{ classes: { input: classes.inputSelect } }}
            value={value}
            label={t('EntityEdit.PropertyMenu.PropertyItem.value')}
            variant="outlined"
            onChange={handleFormValueChange}>
            <MenuItem className={classes.inputFont} value="true">
              {t('EntityEdit.PropertyMenu.PropertyItem.boolItem.true')}
            </MenuItem>
            <MenuItem className={classes.inputFont} value="false">
              {t('EntityEdit.PropertyMenu.PropertyItem.boolItem.false')}
            </MenuItem>
          </TextField>
        );

      case 'Key':
        return (
          <TextField
            required
            value={value}
            onChange={handleFormValueChange}
            size="small"
            InputLabelProps={{ shrink: true }}
            InputProps={{ classes: { input: classes.inputFont } }}
            className={classes.textField}
            label={t('EntityEdit.PropertyMenu.PropertyItem.value')}
            variant="outlined"
          />
        );

      case 'Null':
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemText
          classes={{
            primary: classes.itemName,
            secondary: classes.inputFont,
          }}
          primary={makeTitle()}
          secondary={t('EntityEdit.PropertyMenu.PropertyItem.subTitle')}
        />
        {open && (
          <IconButton onClick={handleDeleteButton} aria-label="delete">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        )}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Card>
          <CardContent>
            <List component="nav" aria-label="property area">
              <ListItem>
                <TextField
                  required
                  size="small"
                  value={name}
                  onChange={handleNameChange}
                  InputProps={{ classes: { input: classes.inputFont } }}
                  InputLabelProps={{ shrink: true }}
                  className={classes.textField}
                  label={t('EntityEdit.PropertyMenu.PropertyItem.name')}
                  variant="outlined"
                />
              </ListItem>
              <ListItem>
                <TextField
                  select
                  className={classes.textField}
                  SelectProps={{ classes: { select: classes.select } }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ classes: { input: classes.inputSelect } }}
                  value={type}
                  label={t('EntityEdit.PropertyMenu.PropertyItem.type')}
                  variant="outlined"
                  onChange={handleChange}>
                  <MenuItem className={classes.inputFont} value="String">
                    {t('EntityEdit.PropertyMenu.PropertyItem.listItem.string')}
                  </MenuItem>
                  <MenuItem className={classes.inputFont} value="Date">
                    {t('EntityEdit.PropertyMenu.PropertyItem.listItem.date')}
                  </MenuItem>
                  <MenuItem className={classes.inputFont} value="Integer">
                    {t('EntityEdit.PropertyMenu.PropertyItem.listItem.int')}
                  </MenuItem>
                  <MenuItem className={classes.inputFont} value="Float">
                    {t('EntityEdit.PropertyMenu.PropertyItem.listItem.float')}
                  </MenuItem>
                  <MenuItem className={classes.inputFont} value="Boolean">
                    {t('EntityEdit.PropertyMenu.PropertyItem.listItem.bool')}
                  </MenuItem>
                  <MenuItem className={classes.inputFont} value="Key">
                    {t('EntityEdit.PropertyMenu.PropertyItem.listItem.key')}
                  </MenuItem>
                  <MenuItem className={classes.inputFont} value="Null">
                    {t('EntityEdit.PropertyMenu.PropertyItem.listItem.null')}
                  </MenuItem>
                </TextField>
              </ListItem>
              <ListItem>{formAdjuster(type)}</ListItem>
              <ListItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkState}
                      onChange={handleCheckBoxChange}
                      value="checked"
                      color="primary"
                    />
                  }
                  classes={{
                    label: classes.inputFont,
                  }}
                  label={t('EntityEdit.PropertyMenu.PropertyItem.registIndex')}
                />
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <Button onClick={handleSave} size="small" color="primary">
              {t('EntityEdit.PropertyMenu.Button.save')}
            </Button>
            <Button onClick={handleCancel} size="small" color="primary">
              {t('EntityEdit.PropertyMenu.Button.cancel')}
            </Button>
          </CardActions>
        </Card>
      </Collapse>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '50%',
    },
    list: {
      margin: theme.spacing(2),
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(2),
      fontSize: 20,
      textAlign: 'left',
    },
    addProperty: {
      fontSize: 14,
      color: '#4169e1',
    },
    addPropertyButton: {
      outline: 'solid 1px lightgrey',
    },
  }),
);

interface MenuProps {
  properties: Array<any>;
  lang: string;
}

export default function PropertyMenu(props: MenuProps) {
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(props.lang);
  }, [props.lang, i18n]);

  const convertData = (properties: Array<PropertyObject>) => {
    return properties.map((property) => {
      return {
        name: property.property_name,
        type: property.getType(),
        value: property.value,
        index: property.index,
      };
    });
  };

  const [properties, setProperties] = React.useState(
    convertData(props.properties),
  );

  const handleClickAddProperty = () => {
    const newProperties = properties.slice();
    newProperties.push({ name: '', type: '', value: '', index: false });
    setProperties(newProperties);
  };

  const deleteProperty = (name: string) => {
    const newProperties = properties.slice();
    const position = _.findIndex(newProperties, (data) => {
      return data.name === name;
    });
    newProperties.splice(position, 1);
    setProperties(newProperties);
  };

  const updateProperty = (prop: PropertyProps) => {
    const newProperties = properties.slice();
    const position = _.findIndex(newProperties, (data) => {
      return data.name === prop.name;
    });
    newProperties[position] = prop;
    setProperties(newProperties);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>{t('EntityEdit.PropertyMenu.title')}</div>
      <List className={classes.list}>
        {properties.map((property) => (
          <PropertyItem
            key={property.name}
            name={property.name}
            type={property.type}
            value={property.value}
            index={property.index}
            DeleteHandler={deleteProperty}
            SaveHandler={updateProperty}
            lang={props.lang}
          />
        ))}
        <ListItem
          button
          onClick={handleClickAddProperty}
          className={classes.addPropertyButton}>
          <ListItemText
            classes={{ primary: classes.addProperty }}
            primary={t('EntityEdit.PropertyMenu.addProperty')}
          />
        </ListItem>
      </List>
    </div>
  );
}

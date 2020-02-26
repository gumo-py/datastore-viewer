import React from 'react';
import * as _ from "underscore";
import moment from 'moment-timezone';
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
import IconButton from "@material-ui/core/IconButton";


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
            width:'100%',
}       ,
        select: {
            height: 30,
            paddingTop: 0,
            paddingBottom: 0,
        },
        cardButtons: {
            textAlign: 'right'
        },
    }),
);

interface PropertyProps {
    name: string;
    type: string;
    value: any;
    index: boolean;
    DeleteHandler?: (name: string) => void;
    SaveHandler?: (props: PropertyProps) => void;
}

const PropertyItem: React.FC<PropertyProps> = props => {
    const classes = useMenuItemStyles();
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState(props.type);
    const [name, setName] = React.useState(props.name);
    const [value, setValue] = React.useState(props.value);
    const [checkState, setCheckState] = React.useState(props.index);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleDeleteButton = () => {
        if(props.DeleteHandler) {
            props.DeleteHandler(name);
        }
    };
    const handleSave = () => {
        if(props.SaveHandler) {
            const newProperty = {
                name: name,
                type: type,
                value: value,
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
        setOpen(!open);
    };
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setType(event.target.value as string);
    };
    const handleCheckBoxChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCheckState(!checkState);
    };
    const handleFormValueChange = (event: React.ChangeEvent<{ value: any }>) => {
        setValue(event.target.value);
    };
    const handleNameChange = (event: React.ChangeEvent<{ value: any }>) => {
        setName(event.target.value);
    };

    React.useEffect(() => {
        if(type === 'Date') {
            setValue(moment(value).format('YYYY-MM-DDThh:mm'));
        }
    }, [value, type]);

    const formAdjuster = (type: string) => {
        switch (type){
            case 'String':
                return (
                    <TextField
                        required
                        value={value}
                        onChange={handleFormValueChange}
                        size={'small'}
                        multiline={true}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ classes: { input: classes.inputFont } }}
                        className={classes.textField}
                        label={"値"}
                        variant="outlined" /> );

            case 'Date':
                return (
                    <TextField
                        required
                        value={value}
                        onChange={handleFormValueChange}
                        type="datetime-local"
                        size={'small'}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ classes: { input: classes.inputFont } }}
                        className={classes.textField}
                        label={"値"}
                        variant="outlined" />);

            case 'Integer':
                return (
                    <TextField
                        required
                        value={value}
                        onChange={handleFormValueChange}
                        size={'small'}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ classes: { input: classes.inputFont } }}
                        className={classes.textField}
                        label={"値"}
                        variant="outlined" /> );

            case 'Float':
                return (
                    <TextField
                        required
                        value={value}
                        onChange={handleFormValueChange}
                        size={'small'}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ classes: { input: classes.inputFont } }}
                        className={classes.textField}
                        label={"値"}
                        variant="outlined" /> );

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
                        label={"値"}
                        variant="outlined"
                        onChange={handleFormValueChange}>
                        <MenuItem className={classes.inputFont} value={'true'}>{'真'}</MenuItem>
                        <MenuItem className={classes.inputFont} value={'false'}>{'偽'}</MenuItem>
                    </TextField>
                );

            case 'Key':
                return (
                    <TextField
                        required
                        value={value}
                        onChange={handleFormValueChange}
                        size={'small'}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ classes: { input: classes.inputFont } }}
                        className={classes.textField}
                        label={"値"}
                        variant="outlined" /> );

            case 'Null':
                return;
        }
    };

    return (
        <div className={classes.root}>
            <ListItem button onClick={handleClick}>
                <ListItemText
                    classes={{
                        primary: classes.itemName,
                        secondary: classes.inputFont
                    }}
                    primary={`${name}: ${value}`}
                    secondary={"インデックス登録"}
                />
                {open &&
                    <IconButton onClick={handleDeleteButton} aria-label="delete">
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                }
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Card>
                    <CardContent>
                        <List component="nav" aria-label="property area">
                            <ListItem>
                                <TextField
                                    required
                                    size={'small'}
                                    value={name}
                                    onChange={handleNameChange}
                                    InputProps={{ classes: { input: classes.inputFont } }}
                                    InputLabelProps={{ shrink: true }}
                                    className={classes.textField}
                                    label={"名前"}
                                    variant="outlined" />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    select
                                    className={classes.textField}
                                    SelectProps={{ classes: { select: classes.select } }}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ classes: { input: classes.inputSelect } }}
                                    value={type}
                                    label={"タイプ"}
                                    variant="outlined"
                                    onChange={handleChange}
                                >
                                    <MenuItem className={classes.inputFont} value={'String'}>{'文字列'}</MenuItem>
                                    <MenuItem className={classes.inputFont} value={'Date'}>{'日時'}</MenuItem>
                                    <MenuItem className={classes.inputFont} value={'Integer'}>{'整数'}</MenuItem>
                                    <MenuItem className={classes.inputFont} value={'Float'}>{'浮動小数点数'}</MenuItem>
                                    <MenuItem className={classes.inputFont} value={'Boolean'}>{'ブール値'}</MenuItem>
                                    <MenuItem className={classes.inputFont} value={'Key'}>{'鍵'}</MenuItem>
                                    <MenuItem className={classes.inputFont} value={'Null'}>{'Null'}</MenuItem>
                                </TextField>
                            </ListItem>
                            <ListItem>
                                { formAdjuster(type) }
                            </ListItem>
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
                                    label={'このプロパティをインデックス登録する'}
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleSave} size="small" color="primary">
                            {"完了"}
                        </Button>
                        <Button onClick={handleCancel} size="small" color="primary">
                            {"キャンセル"}
                        </Button>
                    </CardActions>
                </Card>
            </Collapse>
        </div>
    )
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
}

export default function PropertyMenu(props: MenuProps) {
    const classes = useStyles();

    const convertData = (properties: Array<Property>) => {
        return properties.map( property => {
            return {
                name: property.name,
                type: property.getType(),
                value: property.value,
                index: property.index,
            }})
    };

    const [properties, setProperties] = React.useState(convertData(props.properties));

    const handleClickAddProperty = () => {
        const newProperties = properties.slice();
        newProperties.push({ name: '', type: '', value: '', index: false });
        setProperties(newProperties);
    };

    const deleteProperty = (name: string) => {
        const newProperties = properties.slice();
        const position = _.findIndex(newProperties, props => { return props.name === name });
        newProperties.splice(position, 1);
        setProperties(newProperties);
    };

    const updateProperty = (prop: PropertyProps) => {
        const newProperties = properties.slice();
        const position = _.findIndex(newProperties, props => { return props.name === prop.name });
        newProperties[position] = prop;
        setProperties(newProperties);
    };

    return (
        <div className={classes.root}>
            <div className={classes.title}>プロパティ</div>
            <List className={classes.list}>
                { properties.map( property =>
                    <PropertyItem
                        name={property.name}
                        type={property.type}
                        value={property.value}
                        index={property.index}
                        DeleteHandler={deleteProperty}
                        SaveHandler={updateProperty}/> )
                }
                <ListItem button onClick={handleClickAddProperty} className={classes.addPropertyButton}>
                <ListItemText
                    classes={{ primary: classes.addProperty }}
                    primary={'プロパティを追加'}
                />
            </ListItem>
            </List>
        </div>
    )
}
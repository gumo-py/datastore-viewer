import React from 'react';
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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface MenuProps {

}
const useMenuItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
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
const PropertyItem: React.FC = (props: MenuProps) => {
    const classes = useMenuItemStyles();
    const [open, setOpen] = React.useState(true);
    const [type, setType] = React.useState('');
    const [checkState, setCheckState] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setType(event.target.value as string);
    };
    const handleCheckBoxChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCheckState(!checkState);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemText
                    classes={{
                        primary: classes.itemName,
                        secondary: classes.inputFont
                    }}
                    primary={"name: testProject2"}
                    secondary={"インデックス登録"}
                />
                {open &&
                    <IconButton aria-label="delete">
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
                                    <MenuItem className={classes.inputFont} value={'Array'}>{'配列'}</MenuItem>
                                    <MenuItem className={classes.inputFont} value={'Null'}>{'Null'}</MenuItem>
                                </TextField>
                            </ListItem>
                            <ListItem>
                                <TextField
                                    size={'small'}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ classes: { input: classes.inputFont } }}
                                    className={classes.textField}
                                    label={"値"}
                                    variant="outlined" />
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
                        <Button size="small" color="primary">
                            {"完了"}
                        </Button>
                        <Button size="small" color="primary">
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

        }
    }),
);

export default function PropertyMenu() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>プロパティ</div>
            <List className={classes.list}>
                <PropertyItem />
            </List>
        </div>
    )
}
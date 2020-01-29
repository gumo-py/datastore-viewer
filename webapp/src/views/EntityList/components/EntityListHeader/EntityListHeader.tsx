import React from 'react';
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import FilterListIcon from '@material-ui/icons/FilterList';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(3),
            textAlign: 'left',
            display: 'flex',

        },
        button: {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(2),
            fontSize: 13,
            color: '#4169e1',
        },
        formControl: {
            marginLeft: theme.spacing(2),
            minWidth: 200,
        },
        listItem: {
            fontSize: 13
        },
        input: {
            padding: "10px 14px"
        }
    }),
);

export default function MenuBar() {
    const classes = useStyles();
    const [entity, setEntity] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEntity(event.target.value as string);
    };

    return (
        <div className={classes.root}>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    value={entity}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.listItem}
                    input={<OutlinedInput classes={{ input: classes.input }} />}
                >
                    <MenuItem className={classes.listItem} value="" disabled>{'種類'}</MenuItem>
                    <MenuItem className={classes.listItem} value={10}>{'Project'}</MenuItem>
                    <MenuItem className={classes.listItem} value={20}>{'Task'}</MenuItem>
                </Select>
            </FormControl>
            <Button startIcon={<FilterListIcon/>} className={classes.button}>
                { "エンティティをフィルタ" }
            </Button>
        </div>
    )
}
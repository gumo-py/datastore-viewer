import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
           width: '20%'
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
    }),
);

interface Props {
    kinds: string[];
}

export default function DenseTable(props: Props) {
  const classes = useStyles();
  const [nameSpace, setNameSpace] = React.useState('default');
  const [kind, setKind] = React.useState('Project');
  const [keyType, setKeyType] = React.useState('Number');
  const [customKey, setCustomKey] = React.useState('');

  const handleNameSpaceChange = (event: React.ChangeEvent<{ value: any }>) => {
        setNameSpace(event.target.value);
  };
  const handleKindChange = (event: React.ChangeEvent<{ value: any }>) => {
        setKind(event.target.value);
  };
  const handleKeyTypeChange = (event: React.ChangeEvent<{ value: any }>) => {
        setKeyType(event.target.value);
  };
  const handleCustomKeyChange = (event: React.ChangeEvent<{ value: any }>) => {
        setCustomKey(event.target.value);
  };
  return (
    <List className={classes.root}>
        <ListItem>
            <TextField
                select
                size={'small'}
                value={nameSpace}
                onChange={handleNameSpaceChange}
                InputProps={{ classes: { input: classes.inputFont } }}
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                label={"名前空間"}
                variant="outlined" >
                <MenuItem className={classes.inputFont} value={'default'}>{'[デフォルト]'}</MenuItem>
            </TextField>
        </ListItem>
        <ListItem>
            <TextField
                select
                size={'small'}
                value={kind}
                onChange={handleKindChange}
                InputProps={{ classes: { input: classes.inputFont } }}
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                label={"種類"}
                variant="outlined" >
                {props.kinds.map( kind => {
                    return <MenuItem className={classes.inputFont} value={kind}>{kind}</MenuItem>
                })}
            </TextField>
        </ListItem>
        <ListItem>
            <TextField
                select
                size={'small'}
                value={keyType}
                onChange={handleKeyTypeChange}
                InputProps={{ classes: { input: classes.inputFont } }}
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                label={"キー識別子"}
                variant="outlined" >
                <MenuItem className={classes.inputFont} value={'Number'}>{'数値ID(自動生成)'}</MenuItem>
                <MenuItem className={classes.inputFont} value={'String'}>{'カスタム名'}</MenuItem>
            </TextField>
        </ListItem>
        <Collapse in={keyType === 'String'} timeout="auto" unmountOnExit>
        <ListItem>
            <TextField
                required
                size={'small'}
                value={customKey}
                onChange={handleCustomKeyChange}
                InputProps={{ classes: { input: classes.inputFont } }}
                InputLabelProps={{ shrink: true }}
                className={classes.textField}
                label={"カスタム名"}
                variant="outlined" >
            </TextField>
        </ListItem>
        </Collapse>
    </List>
  );
}
import React from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '20%',
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
  }),
);

interface Props {
  kinds: string[];
  lang: string;
}

export default function DenseTable(props: Props) {
  const classes = useStyles();
  const [kind, setKind] = React.useState('Project');
  const [keyType, setKeyType] = React.useState('Number');
  const [customKey, setCustomKey] = React.useState('');
  const [t, i18n] = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(props.lang);
  }, [props.lang, i18n]);

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
          size="small"
          value={kind}
          onChange={handleKindChange}
          InputProps={{ classes: { input: classes.inputFont } }}
          InputLabelProps={{ shrink: true }}
          className={classes.textField}
          label={t('NewEntityEdit.EntityInfoEdit.kind')}
          variant="outlined">
          {props.kinds.map((data) => {
            return (
              <MenuItem className={classes.inputFont} value={data} key={data}>
                {data}
              </MenuItem>
            );
          })}
        </TextField>
      </ListItem>
      <ListItem>
        <TextField
          select
          size="small"
          value={keyType}
          onChange={handleKeyTypeChange}
          InputProps={{ classes: { input: classes.inputFont } }}
          InputLabelProps={{ shrink: true }}
          className={classes.textField}
          label={t('NewEntityEdit.EntityInfoEdit.keyIdentifier')}
          variant="outlined">
          <MenuItem className={classes.inputFont} value="Number">
            {t('NewEntityEdit.EntityInfoEdit.KeyIdMenu.number')}
          </MenuItem>
          <MenuItem className={classes.inputFont} value="String">
            {t('NewEntityEdit.EntityInfoEdit.KeyIdMenu.string')}
          </MenuItem>
        </TextField>
      </ListItem>
      <Collapse in={keyType === 'String'} timeout="auto" unmountOnExit>
        <ListItem>
          <TextField
            required
            size="small"
            value={customKey}
            onChange={handleCustomKeyChange}
            InputProps={{ classes: { input: classes.inputFont } }}
            InputLabelProps={{ shrink: true }}
            className={classes.textField}
            label={t('NewEntityEdit.EntityInfoEdit.customName')}
            variant="outlined"
          />
        </ListItem>
      </Collapse>
    </List>
  );
}

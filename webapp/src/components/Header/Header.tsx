import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import { Domain } from '../../api-types';
import { fetchProject } from '../../infra/project/projectClient';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    textField: {
      margin: theme.spacing(0.5),
      width: 250,
      borderColor: 'white',
    },
    notchedOutline: {
      borderWidth: '1px',
      borderColor: 'white !important',
    },
    input: {
      height: 5,
      color: 'white',
    },
    langSelect: {
      marginLeft: 'auto',
      marginRight: -8,
      '&:before': {
        borderColor: 'white',
      },
      '&:after': {
        borderColor: 'white',
      },
    },
    icon: {
      color: 'white',
    },
  }),
);

interface Props {
  setProjectName(name: string): void;
  setLang(lang: string): void;
  lang: string;
  projectName: any;
}

export const Header: React.FunctionComponent<Props> = ({
  setProjectName,
  setLang,
  lang,
  projectName,
}) => {
  const classes = useStyles();
  const [projectStatus, setProjectStatus] = React.useState<Domain.Project>();
  const [projectNameStatus, setProjectNameStatus] = React.useState<string>('');
  const [langStatus, setLangStatus] = React.useState<string>(lang);

  if (!projectStatus) {
    fetchProject().then((data) => setProjectStatus(data.projectResult));
  }

  React.useEffect(() => {
    if (!projectName && projectStatus) {
      const defaultProjectName = projectStatus.project_name;
      setProjectNameStatus(defaultProjectName);
      setProjectName(defaultProjectName);
    } else if (projectName) {
      setProjectNameStatus(projectName);
    }
  }, [projectStatus, projectName]);

  React.useEffect(() => {
    setLang(langStatus);
  }, [langStatus, lang]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectNameStatus(event.target.value);
  };
  const handleChangeLang = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLangStatus(event.target.value as string);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Link
            href="/datastore_viewer/"
            style={{ textDecoration: 'none', color: 'white' }}>
            <Typography className={classes.title} variant="h6" noWrap>
              Datastore-Viewer
            </Typography>
          </Link>
          <TextField
            className={classes.textField}
            InputProps={{
              classes: {
                input: classes.input,
                notchedOutline: classes.notchedOutline,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <div
                    className="project-name-refresh-icon"
                    onClick={() => {
                      setProjectName(projectNameStatus);
                    }}>
                    <IconButton edge="end" color="inherit">
                      <AutorenewIcon style={{ fill: 'white' }} />
                    </IconButton>
                  </div>
                </InputAdornment>
              ),
            }}
            onChange={handleChangeName}
            value={projectNameStatus}
            variant="outlined"
          />
          <Select
            className={classes.langSelect}
            inputProps={{
              classes: {
                icon: classes.icon,
                root: classes.icon,
              },
            }}
            value={langStatus}
            onChange={handleChangeLang}>
            <MenuItem value="ja">ja</MenuItem>
            <MenuItem value="en">en</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </div>
  );
};

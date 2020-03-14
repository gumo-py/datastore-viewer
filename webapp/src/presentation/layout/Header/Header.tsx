import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getProject } from "../../../infrastructure/APIClient";

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
            borderColor: 'white'
        },
        notchedOutline: {
            borderWidth: "1px",
            borderColor: "white !important",
        },
        input: {
            height: 5,
            color: 'white',
        },
        langSelect: {
            marginLeft: "auto",
            marginRight: -8,
            "&:before": {
                borderColor: "white",
            },
            "&:after": {
                borderColor: "white",
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
}

export default function HeaderAppBar(props: Props) {
  const classes = useStyles();
  const [project, setProject] = React.useState<Project>();
  const [projectName, setProjectName] = React.useState<string>('');
  const [lang, setLang] = React.useState<string>('en');

  if(!project) {
      getProject().then( res => setProject(res.projectResult) );
  }

  React.useEffect(() => {
      if(project) {
          const defaultProjectName = project.project_name;
          setProjectName(defaultProjectName);
      }
  }, [project]);

  React.useEffect(() => {
      props.setProjectName(projectName);
  }, [projectName, props]);

  React.useEffect(() => {
      props.setLang(lang);
  }, [lang, props]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };
  const handleChangeLang = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLang(event.target.value as string);
  };

  return (
      <div className={classes.grow}>
          <AppBar position="static">
              <Toolbar variant="dense">
                  <Typography className={classes.title} variant="h6" noWrap>
                      Datastore-Viewer
                  </Typography>
                  <TextField
                      className={classes.textField}
                      InputProps={{
                          classes: {
                              input: classes.input,
                              notchedOutline: classes.notchedOutline
                          }
                      }}
                      onChange={handleChangeName}
                      value={projectName}
                      variant={"outlined"}
                  />
                  <Select
                      className={classes.langSelect}
                      inputProps={{
                            classes: {
                                icon: classes.icon,
                                root: classes.icon,
                            },
                      }}
                      value={lang}
                      onChange={handleChangeLang}
                  >
                      <MenuItem value={'ja'}>ja</MenuItem>
                      <MenuItem value={'en'}>en</MenuItem>
                  </Select>
              </Toolbar>
          </AppBar>
      </div>
  );
}
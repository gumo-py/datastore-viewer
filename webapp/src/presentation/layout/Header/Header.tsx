import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
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
            borderColor: "white !important"
        },
        input: {
            height: 5,
            color: 'white',
        },
    }),
);

interface Props {
    setProjectName(name: string): void;
}

export default function HeaderAppBar(props: Props) {
  const classes = useStyles();
  const [project, setProject] = React.useState<Project>();
  const [projectName, setProjectName] = React.useState<string>('');

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };

  return (
      <div className={classes.grow}>
          <AppBar position="static">
              <Toolbar variant="dense">
                  <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="open drawer"
                  >
                      <MenuIcon />
                  </IconButton>
                  <Typography className={classes.title} variant="h6" noWrap>
                      Datastore-Viewer
                  </Typography>
                  <TextField
                      color={'primary'}
                      className={classes.textField}
                      InputProps={{
                          classes: {
                              input: classes.input,
                              notchedOutline: classes.notchedOutline
                          }
                      }}
                      onChange={handleChange}
                      value={projectName}
                      variant={"outlined"}
                  />
              </Toolbar>
          </AppBar>
      </div>
  );
}
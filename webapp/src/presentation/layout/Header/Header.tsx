import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import { getProjectList } from "../../../infrastructure/APIClient";

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
  const [projectList, setProjectList] = React.useState<Array<Project>>();
  const [projectName, setProjectName] = React.useState<string>('');

  if(!projectList) {
      getProjectList().then( res => setProjectList(res.projectResults) );
  }

  React.useEffect(() => {
      if(projectList) {
          const defaultProjectName = projectList[0].project_name;
          setProjectName(defaultProjectName);
      }
  }, [projectList]);

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
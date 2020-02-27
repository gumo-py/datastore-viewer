import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { getProjectList } from "../../../infrastructure/APIClient";
import { ProjectListModal } from './components/ProjectListModal';


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
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    button: {
      marginLeft: theme.spacing(3),
      textTransform: 'none',
      color: 'white',
    },
  }),
);

interface Props {
    setProjectName(name: string): void;
}

export default function HeaderAppBar(props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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
  }, [projectName]);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                  <Button
                      color="inherit"
                      endIcon={<ArrowDropDownIcon/>}
                      className={classes.button}
                      onClick={handleOpen}
                  >
                      { projectName }
                  </Button>
                  <Modal
                      open={open}
                      onClose={handleClose}
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                          timeout: 500,
                      }}
                  >
                      <Fade in={open}>
                          <ProjectListModal
                              ProjectList={projectList}
                              setModalState={setOpen}
                              setProjectName={setProjectName}
                          />
                      </Fade>
                  </Modal>
              </Toolbar>
          </AppBar>
      </div>
  );
}
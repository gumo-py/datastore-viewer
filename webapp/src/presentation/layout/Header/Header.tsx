import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from "@material-ui/core/IconButton";
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
    lang: string;
    projectName: any;
}

export default function HeaderAppBar(props: Props) {
    const classes = useStyles();
    const [project, setProject] = React.useState<Project>();
    const [projectName, setProjectName] = React.useState<string>('');
    const [lang, setLang] = React.useState<string>(props.lang);

    if(!project) {
        getProject().then( res => setProject(res.projectResult) );
    }

    React.useEffect(() => {
        if(!props.projectName && project) {
            const defaultProjectName = project.project_name;
            setProjectName(defaultProjectName);
            props.setProjectName(defaultProjectName);

        }else if(props.projectName) {
            setProjectName(props.projectName);
        }
    }, [project, props.projectName]);

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
                            },
                            endAdornment:
                                <InputAdornment position="end">
                                    <div
                                        className={"project-name-refresh-icon"}
                                        onClick={() => {props.setProjectName(projectName);}}
                                    >
                                        <IconButton edge="end" color="inherit">
                                            <AutorenewIcon style={{fill: 'white'}}/>
                                        </IconButton>
                                    </div>
                                </InputAdornment>
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
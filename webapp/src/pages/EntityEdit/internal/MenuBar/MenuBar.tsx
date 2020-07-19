import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1),
      textAlign: 'left',
      display: 'flex',
    },
    title: {
      marginTop: theme.spacing(1.5),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(2),
      fontSize: 20,
    },
    button: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(2),
      textTransform: 'none',
      fontSize: 13,
      color: '#4169e1',
    },
    iconButton: {
      marginLeft: theme.spacing(1),
      color: '#4169e1',
    },
    paper: {
      position: 'relative',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modalMenu: {
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: 13,
      color: '#4169e1',
    },
    modalButton: {
      padding: '4px',
    },
    modalCloseButton: {
      position: 'absolute',
      top: '10%',
      right: '5%',
    },
  }),
);

interface Props {
  refreash(): void;
  delete(): void;
  lang: string;
}

export default function MenuBar(props: Props) {
  const history = useHistory();
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  React.useEffect(() => {
    i18n.changeLanguage(props.lang);
  }, [props.lang, i18n]);

  const handleClickRefreashEntity = () => {
    props.refreash();
  };

  const handleClickDeleteEntity = () => {
    props.delete();
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="back"
        className={classes.iconButton}
        onClick={history.goBack}>
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>
      <div className={classes.title}>{t('EntityEdit.MenuBar.title')}</div>
      <Button
        startIcon={<RefreshIcon />}
        onClick={handleClickRefreashEntity}
        className={classes.button}>
        {t('EntityEdit.MenuBar.refresh')}
      </Button>
      <Button
        startIcon={<DeleteIcon />}
        onClick={handleOpenModal}
        className={classes.button}>
        {t('EntityEdit.MenuBar.delete')}
      </Button>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className={classes.paper}>
          <div onClick={handleCloseModal} className={classes.modalCloseButton}>
            <CloseIcon style={{ fontSize: '32px' }} />
          </div>
          <h2 id="delete-modal-title">
            {t('EntityEdit.MenuBar.deleteModal.title')}
          </h2>
          <p>{t('EntityEdit.MenuBar.deleteModal.content')}</p>
          <div className={classes.modalMenu}>
            <div className={classes.modalButton}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickDeleteEntity}>
                {t('EntityEdit.MenuBar.deleteModal.button.delete')}
              </Button>
            </div>
            <div className={classes.modalButton}>
              <Button color="primary" onClick={handleCloseModal}>
                {t('EntityEdit.MenuBar.deleteModal.button.cancel')}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

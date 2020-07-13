import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MenuBar } from './components/MenuBar';
import { EntityInfoEdit } from './components/EntityInfoEdit';
import { PropertyMenu } from './components/PropertyMenu';

const testEntity = {
  namespace: '[デフォルト]',
  kind: 'Project',
  entityKey: 'Project name:3exmxvfn2nbktklxerll7agmme',
  keyLiteral: "Key(Project, '3exmxvfn2nbktklxerll7agmme')",
  URLSafeKey:
    'ahNufnRvZG8td2l0aG91dC1ndW1vcicLEgdQcm9qZWN0IhozZXhteHZmbjJuYmt0a2x4ZXJsbDdhZ21tZQw\n',
  property: [],
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    saveMenu: {
      marginLeft: theme.spacing(2),
      textAlign: 'left',
    },
    button: {
      marginRight: theme.spacing(2),
    },
  }),
);

interface Props {
  lang: string;
}

export default function NewEntityEdit(props: Props) {
  const [t, i18n] = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(props.lang);
  }, [props.lang, i18n]);

  const classes = useStyles();
  return (
    <div className="Entity">
      <MenuBar lang={props.lang} />
      <EntityInfoEdit kinds={['Project', 'Task']} lang={props.lang} />
      <PropertyMenu properties={testEntity.property} lang={props.lang} />
      <div className={classes.saveMenu}>
        <Button className={classes.button} variant="contained" color="primary">
          {t('NewEntityEdit.Button.save')}
        </Button>
        <Button className={classes.button} color="primary">
          {t('NewEntityEdit.Button.cancel')}
        </Button>
      </div>
    </div>
  );
}

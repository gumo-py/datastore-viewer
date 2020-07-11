import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MenuBar } from "./components/MenuBar";
import { EntityInfo } from "./components/EntityInfo";
import { PropertyMenu } from "./components/PropertyMenu";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { fetchEntity } from "../../../infra/entity/entityClient";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    saveMenu: {
      marginLeft: theme.spacing(2),
      textAlign: "left",
    },
    button: {
      marginRight: theme.spacing(2),
    },
    link: {
      color: "#4169e1",
      textDecoration: "none",
    },
  })
);

interface Props {
  lang: string;
}

export default function EntityEdit(props: Props) {
  let { kind, urlSafeKey, projectName } = useParams();
  const [entity, setEntity] = React.useState<EntityObject>();
  const [t, i18n] = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(props.lang);
  }, [props.lang, i18n]);

  const updateEntity = () => {
    if (kind && urlSafeKey && projectName) {
      fetchEntity({
        projectName: projectName,
        kind: kind,
        urlSafeKey: urlSafeKey,
      }).then((data) => setEntity(data));
    }
  };

  if (!entity) {
    updateEntity();
  }

  const classes = useStyles();
  return (
    <div className={"Entity"}>
      <MenuBar refreash={updateEntity} lang={props.lang} />
      {entity && (
        <EntityInfo
          kind={entity.key.getKind()}
          entityKey={entity.key.toString()}
          keyLiteral={entity.key.toLiteral()}
          URLSafeKey={entity.URLSafeKey}
          lang={props.lang}
        />
      )}
      {entity && (
        <PropertyMenu properties={entity.properties} lang={props.lang} />
      )}
      {/*<div className={classes.saveMenu}>*/}
      {/*    <Button className={classes.button} variant="contained" color="primary">*/}
      {/*        {t('EntityEdit.Button.save')}*/}
      {/*    </Button>*/}
      {/*    <Button className={classes.button} color="primary">*/}
      {/*        <NavLink className={classes.link} to={'/'}>{t('EntityEdit.Button.cancel')}</NavLink>*/}
      {/*    </Button>*/}
      {/*</div>*/}
    </div>
  );
}

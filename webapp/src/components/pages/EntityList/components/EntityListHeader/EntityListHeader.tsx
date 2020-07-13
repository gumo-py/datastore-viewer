import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Domain } from "../../../../../api-types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      textAlign: "left",
      display: "flex",
    },
    button: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(2),
      fontSize: 13,
      color: "#4169e1",
    },
    formControl: {
      marginLeft: theme.spacing(2),
      minWidth: 200,
    },
    listItem: {
      fontSize: 13,
    },
    input: {
      padding: "10px 14px",
    },
  })
);

interface Props {
  setKind(kind: string): void;
  kind?: string;
  kinds?: Domain.KindResult[];
  kindHandler: (kind: Domain.KindResult) => void;
  lang: string;
}

export const EntityListHeader: React.FunctionComponent<Props> = ({
  setKind,
  kind = "",
  kinds = [],
  kindHandler,
  lang,
}) => {
  const classes = useStyles();

  const [entity, setEntity] = React.useState<string>(kind);
  const [t, i18n] = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEntity(event.target.value as string);
  };

  React.useEffect(() => {
    if (kind) setEntity(kind);
  }, [kind]);

  React.useEffect(() => {
    if (!kind && kinds?.length) {
      setEntity(kinds[0].kind);
    }
  }, [kinds, kind]);

  React.useEffect(() => {
    const selectedKind = kinds.find(
      (kind) => kind.kind === entity
    ) as Domain.KindResult;

    if (selectedKind) {
      kindHandler(selectedKind);
      setKind(entity);
    }
  }, [entity, kinds]);

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          value={entity}
          onChange={handleChange}
          displayEmpty
          className={classes.listItem}
          input={<OutlinedInput classes={{ input: classes.input }} />}
        >
          <MenuItem className={classes.listItem} value="" disabled>
            {t("EntityList.EntityListHeader.kind")}
          </MenuItem>
          {kinds.map((obj) => {
            return (
              <MenuItem
                className={classes.listItem}
                key={obj.kind}
                value={obj.kind}
              >
                {obj.kind}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {/*<Button startIcon={<FilterListIcon/>} className={classes.button}>*/}
      {/*    { t('EntityList.EntityListHeader.filter') }*/}
      {/*</Button>*/}
    </div>
  );
};

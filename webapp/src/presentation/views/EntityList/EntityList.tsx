import React from "react";
import { MenuBar } from "./components/MenuBar";
import { EntityListHeader } from "./components/EntityListHeader";
import { EntityListBody } from "./components/EntityListBody";
import { NotFound } from "./components/NotFound";
import { fetchEntities } from "../../../infra/entity/entityClient";
import { fetchKinds } from "../../../infra/kind/kindClient";
import { Domain } from "../../../api-types/domain";
import { EntityCollection } from "../../../domain/Entity";

type Props = {
  setKind(kind: string): void;
  setCurrentPage(page: number): void;
  kind: any;
  projectName: any;
  lang: string;
  currentPage: any;
};

export const EntityList: React.FunctionComponent<Props> = ({
  setKind,
  setCurrentPage,
  kind,
  projectName,
  lang,
  currentPage,
}) => {
  const [kinds, setKinds] = React.useState<Domain.KindResult[] | undefined>();
  const [kindObj, setKindObj] = React.useState<Domain.KindResult>();
  const [page, setPage] = React.useState(currentPage);
  const rowsPerPage = 25;
  const [entityCollection, setEntities] = React.useState<EntityCollection>();

  React.useEffect(() => {
    if (!kinds?.length && projectName) {
      fetchKinds({ projectName: projectName }).then((data) =>
        setKinds(data.kindResults)
      );
    } else {
      setKinds(undefined);
    }
  }, [projectName]);

  const updateEntities = React.useCallback(() => {
    if (kindObj) {
      fetchEntities({
        projectName: projectName,
        kind: kindObj.kind,
        pageNumber: page,
        rowsPerPage: rowsPerPage,
      }).then((entityCollection) => {
        const maxPage = Math.floor(entityCollection.totalCount / rowsPerPage);
        if (maxPage < page) setPage(maxPage);
        console.log("updateEntities", entityCollection);
        setEntities(entityCollection);
      });
    }
    setCurrentPage(page);
  }, [kindObj, projectName, page]);

  React.useEffect(() => {
    updateEntities();
  }, [kindObj, updateEntities]);

  React.useEffect(() => {
    console.log("effect watch", entityCollection);
  }, [entityCollection]);

  return (
    <div className={"EntityList"}>
      <MenuBar refreash={updateEntities} lang={lang} />
      <EntityListHeader
        kinds={kinds}
        kind={kind}
        setKind={setKind}
        kindHandler={setKindObj}
        lang={lang}
      />

      {entityCollection?.entities.length ? (
        <EntityListBody
          kindObj={kindObj}
          entityCollection={entityCollection}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          lang={lang}
          projectName={projectName}
        />
      ) : (
        <NotFound lang={lang} />
      )}
    </div>
  );
};

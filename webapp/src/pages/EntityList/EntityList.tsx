import React from 'react';
import { MenuBar } from './internal/MenuBar';
import { EntityListHeader } from './internal/EntityListHeader';
import { EntityListBody } from './internal/EntityListBody';
import { NotFound } from './internal/NotFound';
import { fetchEntities, deleteEntities } from '../../infra/entity/entityClient';
import { fetchKinds } from '../../infra/kind/kindClient';
import { Domain } from '../../api-types';
import { EntityCollection } from '../../domain/Entity';

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
  const [page, setPage] = React.useState<number>(currentPage);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [ableDeleteButton, setAbleDeleteButton] = React.useState<boolean>(
    false,
  );
  const rowsPerPage = 25;
  const [entityCollection, setEntities] = React.useState<EntityCollection>();

  React.useEffect(() => {
    if (!kinds?.length && projectName) {
      fetchKinds({ projectName }).then((data) => setKinds(data.kindResults));
    } else {
      setKinds(undefined);
    }
  }, [projectName]);

  React.useEffect(() => {
    if (selected.length) {
      setAbleDeleteButton(false);
    } else {
      setAbleDeleteButton(true);
    }
  }, [selected]);

  const updateEntities = React.useCallback(() => {
    if (kindObj) {
      fetchEntities({
        projectName,
        kind: kindObj.kind,
        pageNumber: page,
        rowsPerPage,
      }).then((collection) => {
        const maxPage = Math.floor(collection.totalCount / rowsPerPage);
        if (maxPage < page) setPage(maxPage);
        console.log('updateEntities', collection);
        setEntities(collection);
      });
    }
    setCurrentPage(page);
  }, [kindObj, projectName, page]);

  const removeEntities = () => {
    deleteEntities({
      projectName,
      kind,
      urlSafeKeys: selected,
    }).then(() => {
      updateEntities();
    });
  };

  React.useEffect(() => {
    updateEntities();
  }, [kindObj, updateEntities]);

  React.useEffect(() => {
    console.log('effect watch', entityCollection);
  }, [entityCollection]);

  return (
    <div className="EntityList">
      <MenuBar
        refreash={updateEntities}
        delete={removeEntities}
        ableDeleteButton={ableDeleteButton}
        lang={lang}
      />
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
          setSelectedItems={setSelected}
          lang={lang}
          projectName={projectName}
        />
      ) : (
        <NotFound lang={lang} />
      )}
    </div>
  );
};

export namespace Request {
  export namespace Entity {
    export type FetchAll = {
      projectName: string;
      kind: string;
      pageNumber?: number;
      rowsPerPage?: number;
    };

    export type Fetch = {
      projectName: string;
      kind: string;
      urlSafeKey: string;
    };
  }

  export namespace Kind {
    export type FetchAll = {
      projectName: string;
    };
  }
}

import { Domain } from "./domain";

export namespace Response {
  export namespace Entity {
    export type FetchAll = {
      entityResults: Domain.EntityResult[];
      pageNumber: number;
      perPage: number;
      properties: { index: boolean; name: string }[];
      totalCount: number;
    };

    export type Fetch = {
      entityResult: Domain.EntityResult;
    };
  }

  export namespace Kind {
    export type FetchAll = {
      kindResults: Domain.KindResult[];
    };
  }

  export namespace Project {
    export type Fetch = {
      projectResult: Domain.Project;
    };
  }
}

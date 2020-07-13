import { Domain } from './domain';

export namespace Response {
  export namespace Entity {
    export interface FetchAll {
      entityResults: Domain.EntityResult[];
      pageNumber: number;
      perPage: number;
      properties: { index: boolean; name: string }[];
      totalCount: number;
    }

    export interface Fetch {
      entityResult: Domain.EntityResult;
    }
  }

  export namespace Kind {
    export interface FetchAll {
      kindResults: Domain.KindResult[];
    }
  }

  export namespace Project {
    export interface Fetch {
      projectResult: Domain.Project;
    }
  }
}

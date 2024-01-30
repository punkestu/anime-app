export class Anime {
  constructor(
    public title: string,
    public id: string,
    public thumb: string | undefined,
    public episode: number | undefined,
    public uploaded_on: string | undefined,
    public day_updated: string | undefined,
    public score: number | undefined,
    public link: string | undefined,
    public genre_list:
      | {
          genre_title: string;
          genre_link: string;
          genre_id: string;
        }[]
      | undefined,
    public status: string | undefined
  ) {}
}

export interface HomeAnime {
  on_going: Anime[];
  complete: Anime[];
}

export interface HomeResponse {
  meta: {
    on_going_count: number;
    complete_count: number;
  };
  data: HomeAnime;
}

export interface ListAnimeResponse {
  meta: {
    count: number;
    page: number;
    lastPage: number;
  };
  data: Anime[];
}

export interface SearchAnimeResponse {
  meta: {
    count: number;
    query: string;
  };
  data: Anime[];
}

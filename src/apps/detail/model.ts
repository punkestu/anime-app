export class Anime {
  constructor(
    public id: string,
    public title: string,
    public thumb: string,
    public synopsis: string,
    public score: number,
    public producer: string,
    public episode_list: Episode[],
    public genre: string[]
  ) {}
}

export interface Episode {
  id: string;
  title: string;
  link: string;
}

export interface AnimeDetailResponse {
  meta: {
    episode_count: number;
  };
  data: Anime;
}

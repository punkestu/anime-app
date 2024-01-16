export class Anime {
    constructor(
        public title: string,
        public id: string,
        public thumb: string | undefined,
        public episode: number | undefined,
        public uploaded_on: string | undefined,
        public day_updated: string | undefined,
        public score: number | undefined,
        public link: string | undefined
    ) {
    }
}

export interface HomeAnime {
    on_going: Anime[],
    complete: Anime[]
}

export interface CacheI {
    home: { lastRefresh: Date | null, data: HomeAnime }
}

export interface HomeResponse {
    meta: {
        on_going_count: number,
        complete_count: number,
    }
    data: HomeAnime
}
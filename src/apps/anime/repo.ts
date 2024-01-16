import {Anime, HomeAnime} from "./model";
import axios from "axios";
import cheerio from "cheerio";
import dotenv from "dotenv";

function homeMapper($: cheerio.Root) {
    return (_: number, el: cheerio.Element) => {
        let episode: number | undefined;
        let uploaded_on: string | undefined;
        let day_updated: string | undefined;
        let score: number | undefined;
        let thumb: string | undefined;
        let link: string | undefined;
        let title: string = "";
        let id: string = "";
        $(el)
            .find(".thumb > a")
            .each(function (_, el) {
                title = $(el).find(".thumbz > h2").text();
                thumb = $(el).find(".thumbz > img").attr("src");
                link = $(el).attr("href");
                if (!link) {
                    id = "-";
                } else {
                    id = link.replace(`${process.env.BASE_URL}anime/`, "");
                }
            });
        uploaded_on = $(el).find(".newnime").text();
        const epsEl = $(el).find(".epz").text().split(" ");
        episode = parseInt(epsEl[2]) || parseInt(epsEl[0]);
        score = parseFloat($(el).find(".epztipe").text().replace(" ", ""));
        day_updated = $(el).find(".epztipe").text().replace(" ", "");
        return new Anime(
            title,
            id,
            thumb,
            episode,
            uploaded_on,
            day_updated,
            score,
            link
        );
    }
}

export async function getHomeAnime(): Promise<HomeAnime> {
    dotenv.config();
    let home: HomeAnime = {
        on_going: [],
        complete: []
    };
    if (!process.env.BASE_URL) {
        throw new Error("base url not provided");
    }
    return await axios.get(process.env.BASE_URL)
        .then((response) => {
            const $ = cheerio.load(response.data);
            return {"$": $, "element": $(".venz")};
        }).then(({$, element}) => {
            home.on_going = element
                .children()
                .eq(0)
                .find("ul > li")
                .map(homeMapper($)).get();
            return {$, element};
        })
        .then(({$, element}) => {
            home.complete = element
                .children()
                .eq(1)
                .find("ul > li")
                .map(homeMapper($)).get();
            return home;
        })
        .catch((e) => {
            throw new Error(e.toString());
        });
}
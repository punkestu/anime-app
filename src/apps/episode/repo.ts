import axios from "axios";
import cheerio from "cheerio";

export async function watchAnime(id: string): Promise<{
  url: string | undefined;
  pen: {
    prev: string | undefined;
    episode: string | undefined;
    next: string | undefined;
  };
  title: string | undefined;
}> {
  const episodeDetail = await axios
    .get(`${process.env.BASE_URL}episode/${id}`)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const url = $("#pembed > div > iframe").attr("src");
      const pen = $(".prevnext > .flir > a"); // prev, episode list, next url
      let penRes: {
        prev: string | undefined;
        episode: string | undefined;
        next: string | undefined;
      } = {
        prev: undefined,
        episode: undefined,
        next: undefined,
      };
      pen.each((_, el) => {
        if ($(el).html() === "Previous Eps.") {
          penRes.prev = $(el)
            .attr("href")
            ?.replace(`${process.env.BASE_URL}episode/`, "/watch/");
        }
        if ($(el).html() === "Next Eps.") {
          penRes.next = $(el)
            .attr("href")
            ?.replace(`${process.env.BASE_URL}episode/`, "/watch/");
        }
        if ($(el).html() === "See All Episodes") {
          penRes.episode = $(el)
            .attr("href")
            ?.replace(`${process.env.BASE_URL}anime/`, "/detail/");
        }
      });
      const title = $(".venser > .venutama > .posttl").html() || undefined;
      return { url, pen: penRes, title };
    });
  if (!episodeDetail.url) {
    throw new Error("Video not found");
  }
  return episodeDetail;
}

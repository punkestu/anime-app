import axios from "axios";
import cheerio from "cheerio";

export async function getFrame(url: string): Promise<{
  url: string | undefined;
}> {
  const frameUrl = await fetch(url)
    .then((res) => res.text())
    .then((response) => {
      const $ = cheerio.load(response);
      return $("textarea.form-control.embedcode")
        .html()
        ?.split("src=")[1]
        .split('"')[1];
    });
  return { url: frameUrl };
}

export async function watchAnime(id: string): Promise<{
  url: string | undefined;
  mirrors: { quality: string[]; url: string[] } | undefined;
  pen: {
    prev: string | undefined;
    episode: string | undefined;
    next: string | undefined;
  };
  title: string | undefined;
}> {
  const episodeDetail = await axios
    .get(`${process.env.BASE_URL}episode/${id}`)
    .then(async (response) => {
      const $ = cheerio.load(response.data);
      const fallback = $("#pembed > div > iframe").attr("src");

      const mirrorsQuality = $(".download > ul > li > strong")
        .map((_, el) => {
          return $(el).html();
        })
        .get();
      const mirrorsUrl = $(".download > ul > li > a")
        .map((_, el) => {
          const source = $(el).html();
          if (source === "Acefile ") {
            return $(el).attr("href");
          }
        })
        .get();

      var url = null;
      var mirrors = undefined;
      if (mirrorsUrl.length > 0) {
        await getFrame(mirrorsUrl[0]).then((frame) => {
          url = frame.url;
          mirrors = {
            quality: mirrorsQuality,
            url: mirrorsUrl.map((url) => url.split("id=")[1]),
          };
        });
      }
      if (!url) {
        url = fallback;
      }

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
      return { url, pen: penRes, title, mirrors };
    });
  if (!episodeDetail.url) {
    throw new Error("Video not found");
  }
  return episodeDetail;
}

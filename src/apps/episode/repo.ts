import axios from "axios";
import cheerio from "cheerio";

export async function watchAnime(id: string): Promise<string> {
  const videoFrame = await axios
    .get(`${process.env.BASE_URL}episode/${id}`)
    .then((response) => {
      const $ = cheerio.load(response.data);
      return $("#pembed > div > iframe").attr("src");
    });
  if (!videoFrame) {
    throw new Error("Video not found");
  }
  return videoFrame;
}

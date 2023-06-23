import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
};

const links = [
  "https://www.tripadvisor.com/Restaurant_Review-g608501-d6489279-Reviews-The_Square-Palembang_South_Sumatra_Sumatra.html",
  "https://www.tripadvisor.com/Restaurant_Review-g608501-d6415203-Reviews-Mie_Celor_26_Ilir_H_Syafe_i-Palembang_South_Sumatra_Sumatra.html",
  "https://www.tripadvisor.com/Restaurant_Review-g608501-d6728890-Reviews-Pempek_Es_Kacang_Vico-Palembang_South_Sumatra_Sumatra.html",
];

for (let i = 0; i < links.length; i++) {
  const link = links[i];

  axios
    .get(link, {
      headers: headers,
    })
    .then((response) => {
      const $ = cheerio.load(response.data);
      const partialEntry = $("p.partial_entry").text();
      fs.appendFileSync("notepad.txt", partialEntry + "\n");
    })
    .catch((error) => {
      console.error(error);
    });
}

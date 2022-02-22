const puppeteer = require("puppeteer");
const axios = require("axios");
const https = require("https");
const fs = require("fs");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.w3schools.com/html/html_tables.asp", {
      waitUntil: "networkidle2",
    });

    let file = fs.createWriteStream("json.csv");

    const standings = await page.evaluate(() => {
      const trs = Array.from(
        document.querySelectorAll("#customers > tbody > tr")
      );
      return trs.map((td) =>
        td.textContent === "\n    Company\n    Contact\n    Country\n  "
          ? "nope"
          : td.textContent + `\t`
      );
    });
    console.log(standings);
    console.log("done");
    file.write(JSON.stringify(standings));
  } catch (error) {
    console.log(error);
  }
})();

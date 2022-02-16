const puppeteer = require("puppeteer");
const { download } = require("./Downloader");
const Downloader = require("./Downloader");
const path = require("path");
const axios = require("axios");
const https = require("https");

const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const pathdw = path.resolve("./downloadss");
  // const responsex = await axios.get(
  //   "https://www.alfa.srolatino-servers.com/assets/images/slide-1-min.png"
  // );
  // page.on("response", async (response) => {
  //   const url = response.url();
  //   if (responsex) {
  //     response.buffer().then((file) => {
  //       const fileName = url.split("/").pop();
  //       const filePath = path.resolve("downloadss", fileName);
  //       const writeStream = fs.createWriteStream(filePath);
  //       writeStream.write(file);
  //       console.log(file);
  //     });
  //   }
  //   const urlx = responsex.data.url();
  //   console.log(urlx);
  //   const newFile = Buffer.from(responsex.data);
  //   const filePath = path.resolve("downloadss", "fileName.png");
  //   const writeStream = fs.createWriteStream(filePath);
  //   writeStream.write(newFile);
  //   // console.log(newFile);
  // });

  // await page.goto(
  //   "https://www.alfa.srolatino-servers.com/assets/images/slide-1-min.png",
  //   {
  //     waitUntil: "networkidle2",
  //   }
  // );

  //this is the one
  // await page.goto("https://checklyhq.com/");
  // const imageHref = await page.evaluate((sel) => {
  //   return document.querySelector(sel).getAttribute("src").replace("/", "");
  // }, "#landing > section.hero-section > div > div:nth-child(2) > div > picture > img");

  // const viewSource = await page.goto("https://checklyhq.com/" + imageHref);
  // const buffer = await viewSource.buffer();
  // if (buffer) {
  //   const filePath = path.resolve("downloadss", "checkly.png");
  //   const writeStream = fs.createWriteStream(filePath);
  //   writeStream.write(buffer);
  //   console.log(buffer);
  // }
  // // await writeFileAsync(path.join(__dirname, "checkly.png"), buffer);

  // await page._client.send("Page.setDownloadBehavior", {
  //   behavior: "allow",
  //   downloadPath: pathdw,
  // });

  // await page.goto("https://elestudiantedigital.com/libros-pdf/");
  // const imageHref = await page.evaluate((sel) => {
  //   return document.querySelector(sel).getAttribute("src").replace("/", "");
  // }, "#tablepress-17 > tbody > tr.row-2.even > td.column-2 > a");

  const viewSource = await axios.get(
    "https://download1521.mediafire.com/ga0ljdv35vxg/6u5cn88rg625tbo/hl.rar"
  );
  // const buffer = await viewSource.buffer();
  var file = fs.createWriteStream("h.rar");
  var request = https.get(
    "https://download1521.mediafire.com/ga0ljdv35vxg/6u5cn88rg625tbo/hl.rar",
    function (response) {
      response.pipe(file);
    }
  );
  // await writeFileAsync(path.join(__dirname, "checkly.png"), buffer);

  await page._client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: pathdw,
  });

  // const newFile = Buffer.from(await response.data);

  /**
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("response", async (response) => {
    const url = response.url();
    if (response.request().resourceType() === "image") {
      response.buffer().then((file) => {
        const fileName = url.split("/").pop();
        const filePath = path.resolve("downloadss", fileName);
        const writeStream = fs.createWriteStream(filePath);
        writeStream.write(file);
      });
    }
  });
  await page.goto("https://memeculture69.tumblr.com/");
  await browser.close(); */
})();

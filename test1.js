const puppeteer = require("puppeteer");
const { download } = require("./Downloader");
const Downloader = require("./Downloader");
const path = require("path");
const axios = require("axios");
const https = require("https");

const fs = require("fs");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      "https://billing.osnetpr.com/admin/reports/report_payments_received_detail.php",
      {
        waitUntil: "networkidle2",
      }
    );
    await page.type("#login", "");
    await page.type("#pass", "");
    await page.click("#logclick");
    setTimeout(async () => {
      let file = fs.createWriteStream("excel.csv");
      const data_to_Download = await page.evaluate(() => {
        const element = document.querySelector(
          "#reports_panel_box > div.panel-content > table > tbody > tr:nth-child(2)"
        );
        return element && element.textContent === ""
          ? (element.innerHTML = "nada")
          : element.textContent;
      });
      console.log(data_to_Download);
      file.write(data_to_Download);
    }, 5000);
  } catch (error) {
    console.log(error, error.response);
  }
})();

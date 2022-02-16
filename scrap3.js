const puppeteer = require("puppeteer");
const { download } = require("./Downloader");
const Downloader = require("./Downloader");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation(0);

    await page.goto(
      "https://billing.osnetpr.com/admin/reports/report_payments_received_detail.php",
      {
        waitUntil: "networkidle2",
      }
    );

    await page.type("#login", "garispe");
    await page.type("#pass", "iveth2020");
    await page.click("#logclick");

    const data_to_Download = await page.evaluate(
      "#reports_panel_box > div.panel-content > table > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td:nth-child(1) > a",
      (a) =>
        "https://billing.osnetpr.com/admin/reports/report_payments_received_detail.php?begin=1644897600&end=1644959605&viewall=1&dlcsv=1"
    );
    setTimeout(async () => {
      await page.click(
        "#reports_panel_box > div.panel-content > table > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td:nth-child(1) > a"
      );
      console.log("we are done");
    }, 10000);

    // await page
    //   .waitForTimeout(
    //     "#reports_panel_box > div.panel-content > table > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td:nth-child(1) > a"
    //   )
    //   .then(() =>
    //     page.click(
    //       "#reports_panel_box > div.panel-content > table > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td:nth-child(1) > a"
    //     )
    //   );

    // await page.click("#fromwhat");
    // const text = await page.evaluate(() => {
    //   const element = document.querySelector("#main-tfa > p:nth-child(4)");
    //   return element && element.textContent;
    // });
    // console.log(text);
    // await navigationPromise;
    // await page.type("input.gLFyf.gsfi", "Hi");
    // await navigationPromise;
    // await page.click(".FPdoLc.lJ9FBc input");
    // await navigationPromise;
    // await page.waitForSelector(".q8U8x.goog-textarea");
    // await navigationPromise;

    // const data = await page.evaluate(
    //   () => document.querySelector("*").outerHTML
    // );
    //   return element && element.textContent; // will return undefined if the element is not found
    // });
    // console.log(page);
    // await browser.close();
  } catch (error) {
    console.log(error, error.response);
  }
})();

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto("https://en.wikipedia.org", { waitUntil: "networkidle2" });

//   await page.waitForSelector("input[name=search]");

//   // await page.type('input[name=search]', 'Adenosine triphosphate');
//   await page.$eval(
//     "input[name=search]",
//     (el) => (el.value = "Adenosine triphosphate")
//   );

//   await page.click('input[type="submit"]');
//   await page.waitForSelector("#mw-content-text");
//   const text = await page.evaluate(() => {
//     const anchor = document.querySelector("#mw-content-text");
//     return anchor.textContent;
//   });
//   console.log(text);
//   await browser.close();
// })();

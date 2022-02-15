const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.google.com", { waitUntil: "networkidle2" });

    await page.type("input.gLFyf.gsfi", "Hi");
    await page.click(".FPdoLc.lJ9FBc input");
    await page.waitForSelector(".q8U8x.goog-textarea");

    const text = await page.evaluate(() => {
      const element = document.querySelector(
        ".tw-ta.tw-text-large.q8U8x.goog-textarea"
      );

      return element && element.textContent; // will return undefined if the element is not found
    });
    console.log(text);
    await browser.close();
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

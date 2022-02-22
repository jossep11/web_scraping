const puppeteer = require("puppeteer");
const excel = require("excel4node");
require("dotenv").config();

const excelObject = new excel.Workbook();
let hoja = excelObject.addWorksheet("data");

(async () => {
  try {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(
      "https://billing.osnetpr.com/admin/reports/report_payments_received_detail.php",
      {
        waitUntil: "networkidle2",
      }
    );

    await page.type("#login", process.env.user);
    await page.type("#pass", process.env.pass);
    await page.click("#logclick");
    setTimeout(async () => {
      const ThData = await page.evaluate(() => {
        const ths = Array.from(
          document.querySelectorAll(
            "#reports_panel_box > div.panel-content > table > tbody > tr:nth-child(2) > td > table.table-body > tbody > tr.header > th"
          )
        );
        return ths.map((th) => th.textContent.replace(/(\n)|(\t)+/g, ""));
      });
      console.log(ThData);
      let contadorColumnas1 = 1;
      //loop of the th header
      ThData.forEach((element, index) => {
        hoja.cell(1, index + contadorColumnas1).string(element);
      });

      const TdData = await page.evaluate(() => {
        const tds = Array.from(
          document.querySelectorAll(
            "#reports_panel_box > div.panel-content > table > tbody > tr:nth-child(2) > td > table.table-body > tbody > tr > td"
          )
        );
        return tds.map((td) => td.textContent.replace(/(\n)|(\t)+/g, ""));
      });
      let newarray = [];
      TdData.forEach((element, index) => {
        newarray.push(element);
      });
      let contadorColumnas2 = 1;
      let contadorFilas2 = 2;

      newarray.forEach((element, index) => {
        if (index >= 0) {
          hoja.cell(contadorFilas2, contadorColumnas2).string(element);
          if (contadorColumnas2 == 12) {
            contadorColumnas2 = 0;
            contadorFilas2 = contadorFilas2 + 1;
          }
        }
        contadorColumnas2 = contadorColumnas2 + 1;
      });
      //CREANDO EL ARCHIVO
      excelObject.write("./excel.xlsx", function (error, stats) {
        if (error) {
          console.log("ERROR - ", error.message);
          // res.status(500).json(`Ocurrio un problema con el servidor ${error.message}`).end();
        } else {
          console.log("done!");
        }
      });
      //     // file.write(JSON.stringify(standings));
    }, 5000);
  } catch (error) {
    console.log(error, error.response);
  }
})();

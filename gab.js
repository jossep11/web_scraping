const puppeteer = require("puppeteer");
const fs = require("fs");
const excel = require("excel4node");

//CREANDO EL ARCHIVO
//  let file = fs.createWriteStream("excel.xls");
const excelObject = new excel.Workbook();
//SACANDO LOS DATOS DE LA TABLA

let arreglo = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
// console.log(test);
let hoja = excelObject.addWorksheet("prueba");
let newarray = [];
arreglo.forEach((element, index) => {
  newarray.push(element);
});
console.log(newarray);
let contadorColumnas2 = 1;
let contadorFilas2 = 1;

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
excelObject.write("./excel.csv", function (error, stats) {
  if (error) {
    console.log("ERROR - ", error.message);
    // res.status(500).json(`Ocurrio un problema con el servidor ${error.message}`).end();
  } else {
    console.log("done!");
  }
});

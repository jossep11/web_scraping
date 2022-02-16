const https = require("https");
const fs = require("fs");
const path = require("path");

function download(url, callback) {
  const filename = path.basename(url);
  const req = https.get(url, function (res) {
    const fileStream = fs.createWriteStream(filename);
    res.pipe(fileStream);

    fileStream.on("error", function (err) {
      console.log("Error writting to the stream.");
      console.log(err);
    });
    fileStream.on("close", function () {
      callback(filename);
    });
    fileStream.on("finish", function () {
      fileStream.close();
      console.log("Done!");
    });
  });
  req.on("error", function (err) {
    console.log("Error downloading the file.");
    console.log(err);
  });
}
module.exports.download = download;

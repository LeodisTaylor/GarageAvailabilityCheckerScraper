const scraper = require("./scraper");
const express = require('express');
const garageStatus = require("./GarageAvailableSpotsIntent");
const spotsLeft = require("./SpecificGarageAvailableIntent");
const bodyParser = require("body-parser");

const {
    dialogflow,
    SimpleResponse,
  } = require('actions-on-google');

const dialogFlow = dialogflow();
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

  const lib = {
    scraper,
    SimpleResponse,
  }


dialogFlow.intent("GarageAvailableSpots",conv=>garageStatus(conv,lib));

dialogFlow.intent("SpecificGarageAvailable",conv=>spotsLeft(conv,lib));

restService.post("/garage", dialogFlow);

restService.listen(process.env.PORT || 8080, function() {
  console.log("Server started");
});
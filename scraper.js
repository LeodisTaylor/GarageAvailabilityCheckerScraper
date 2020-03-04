const request = require('request');
const cheerio = require('cheerio');

var garageList =["A","B","C","D","H","I","LIBRA"];

var garageCapacityList = {"A": 1623, "B": 1259, "C": 1852, "D": 1241, "H": 1284, "I": 1231, "LIBRA": 1007};

module.exports = function(){
   var garageAvailability = {
     letter:{},
     index:{}
   };

  const url = 'http://secure.parking.ucf.edu/GarageCount/iframe.aspx';

  return new Promise((resolve,reject)=>{
    request(url, (function (error, response, body) {
      const $ = cheerio.load(body);

      $('strong').each(function(i, elem) {
        
        garageAvailability.letter[garageList[i]] = {
          "name": garageList[i],
          "available": $(this).text(),
          "capacity": garageCapacityList[garageList[i]]
        };

        garageAvailability.index[i] ={
          "name": garageList[i],
          "available": $(this).text(),
          "capacity": garageCapacityList[garageList[i]]
        }

      });

      resolve(garageAvailability);
    }));
  })
};

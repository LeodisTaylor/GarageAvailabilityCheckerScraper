module.exports = async function(conv,lib){
  const {scraper,SimpleResponse} = lib;

  const garageName = conv.parameters.garage.toUpperCase();

  let response = await (async ()=>{
    let response = await scraper();

    let spotsAvailable = response.letter[garageName].available;
    let garageCapacity = response.letter[garageName].capacity 

    let dialogResponse = "Garage " + garageName + " has " + spotsAvailable + " spots left out of " + garageCapacity;

    conv.add(new SimpleResponse(dialogResponse));

    return conv;
  })();

  return conv;

}

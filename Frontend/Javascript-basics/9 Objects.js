// An Object 
let myBike = {
  'Fuel Type': 'Turbo Fuel',
  color: 'silver'
};
console.log(fasterShip);

// Accessing object
  // i - (.) dot notation :
let spaceship = {
  homePlanet: 'Earth',
  color: 'silver',
  FuelType: 'Turbo Fuel',
  numCrew: 5,
  flightPath: ['Venus', 'Mars', 'Saturn']
};
let crewCount = spaceship.numCrew;
let planetArray = spaceship.flightPath;
console.log(crewCount,planetArray);

  // ii - Bracket notation :
let spaceship = {
  'Fuel Type' : 'Turbo Fuel',
  'Active Mission' : true,
  homePlanet : 'Earth', 
  numCrew: 5
 };
let propName =  'Active Mission';
console.log(spaceship[propName]);

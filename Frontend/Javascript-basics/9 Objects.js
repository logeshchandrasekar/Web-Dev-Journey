// An Object 
let spaceship = {
  'Fuel Type': 'Turbo Fuel',
  color: 'silver'
};
console.log(spaceship);

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

// Property assignment in objects
let spaceship = {
  'Fuel Type' : 'Turbo Fuel',
  homePlanet : 'Earth',
  color: 'silver',
  'Secret Mission' : 'Discover life outside of Earth.'
};
spaceship['color']= 'glorious gold';
spaceship.numEngines = 8;
delete spaceship['Secret Mission'];
console.log(spaceship);

// Methods in objects
let retreatMessage = 'We no longer wish to conquer your planet.';
let spaceship = {
  retreat () {
    console.log(retreatMessage)
  },
  takeOff () {
    console.log('Spim... Borp... Glix... Blastoff!');
  }
};
spaceship.retreat();
spaceship.takeOff();

// Nested objects
let spaceship = {
  passengers: [{name: 'Space Dog'}], 
  telescope: {
    yearBuilt: 2018,
    model: "91031-XLT",
    focalLength: 2032 
  },
  crew: {
    captain: { 
      name: 'Sandra', 
      degree: 'Computer Engineering', 
      encourageTeam() { console.log('We got this!') },
     'favorite foods': ['cookies', 'cakes', 'candy', 'spinach'] }
  },
  engine: {
    model: "Nimbus2000"
  },
  nanoelectronics: {
    computer: {
      terabytes: 100,
      monitors: "HD"
    },
    'back-up': {
      battery: "Lithium",
      terabytes: 50
    }
  }
}; 
let capFave = spaceship.crew.captain['favorite foods'][0];
let firstPassenger = spaceship.passengers[0];

// Pass by reference
  // example 1:
let spaceship = {
  homePlanet : 'Earth',
  color : 'red'
};
    // * This function attempts to reassign the parameter object, but it doesn't affect the original object outside the function.
let tryReassignment = obj => {
  obj = {
    homePlanet : 'Mars',
    color : 'silver'
  }
  console.log(obj) // * Prints { homePlanet: 'Mars', color: 'silver' }
};
tryReassignment(spaceship) // * The attempt at reassignment works but does not change the original object.
console.log(spaceship) // * Still returns { homePlanet: 'Earth', color: 'red' };
    // * Regular reassignment still works.
spaceship = {
  homePlanet : 'Mars',
  color : 'silver'
};
console.log(spaceship) // * Prints { homePlanet: 'Mars', color: 'silver' }

  // example 2:
let spaceship = {
  'Fuel Type' : 'Turbo Fuel',
  homePlanet : 'Earth'
};
let greenEnergy = obj => {
  obj['Fuel Type'] = 'avocado oil';
};
let remotelyDisable = obj => {
  obj.disabled = true;
};
greenEnergy(spaceship);
remotelyDisable(spaceship);
console.log(spaceship);

// Looping through object
let spaceship = {
    crew: {
    captain: { 
        name: 'loki', 
        degree: 'Computer Engineering', 
        cheerTeam() { console.log('You got this!') } 
        },
    'chief officer': { 
        name: 'sarathi', 
        degree: 'Aerospace Engineering', 
        agree() { console.log('I agree, captain!') } 
        },
    medic: { 
        name: 'rohinni', 
        degree: 'Physics', 
        announce() { console.log(`Jets on!`) } },
    translator: {
        name: 'dharsh', 
        degree: 'Conservation Science', 
        powerFuel() { console.log('The tank is full!') } 
        }
    }
}; 
for (let crewMember in spaceship.crew) {
  console.log(`${crewMember}: ${spaceship.crew[crewMember].name}`)
};
for (let crewMember in spaceship.crew) {
  console.log(`${spaceship.crew[crewMember].name}: ${spaceship.crew[crewMember].degree}`)
};

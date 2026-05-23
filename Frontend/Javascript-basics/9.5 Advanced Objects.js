// The this. keyword
const robot = {
  model : '1E78V2',
  energyLevel : 100,
  provideInfo() {
    return ('I am ' + this.model + ' and my current energy level is ' + this.energyLevel);
  }
};
console.log(robot.provideInfo());

// Arrow function and this keyword
const robot = {
  energyLevel: 100,
  // Arrow function should not be used !
  checkEnergy() {
    console.log(`Energy is currently at ${this.energyLevel}%.`)
  }
}
robot.checkEnergy();

// Type coersion (concept)
const robot = {
  _energyLevel: 100,
  recharge(){
    this._energyLevel += 30;
    console.log(`Recharged! Energy is currently at ${this._energyLevel}%.`);
  }
};
robot._energyLevel = 'high';
robot.recharge();

// Getters - get and return the internal properties of an object.
const robot = {
  _model: '1E78V2',
  _energyLevel: 100,
  get energyLevel() {
    if(typeof this._energyLevel === 'number') {
    return 'My current energy level is ' + this._energyLevel
    } else {
      return 'System malfunction: cannot retrieve energy level'
    }
  }
};
console.log(robot.energyLevel);

// Setters - reassign values of existing properties within an object.
const robot = {
  _model: '1E78V2',
  _energyLevel: 100,
  _numOfSensors: 15,
  get numOfSensors() {
    if(typeof this._numOfSensors === 'number'){
      return this._numOfSensors;
    } else {
      return 'Sensors are currently down.'
    }
  },
  set numOfSensors(num) {
    if (typeof num === 'number' && num >= 0){
      this._numOfSensors = num;
    } else {
      console.log('Pass in a number that is greater than or equal to 0');
    }
  }
};
robot.numOfSensors = 50;
console.log(robot.numOfSensors);

// Factory function
const robotFactory = (model, mobile) => {
  return {
    model: model,
    mobile: mobile,
    beep() {
      console.log('Beep Boop');
    }
  }
};
const wallE = robotFactory('P-500', true);
wallE.beep();

// Destructured assignment
const robot = {
  model: '1E78V2',
  energyLevel: 100,
  functionality: {
    beep() {
      console.log('Beep Boop');
    },
    fireLaser() {
      console.log('Pew Pew');
    },
  }
};
const {functionality} = robot;
functionality.fireLaser();

// Some built-in objects
const robot = {
	model: 'SAL-1000',
  mobile: true,
  sentient: false,
  armor: 'Steel-plated',
  energyLevel: 75
};

    // Object.keys(obj) – Returns an array of an object's property names (keys)
const robotKeys = Object.keys(robot);
console.log(robotKeys);

    // Object.entries(obj) – Returns an array of [key, value] pairs
const robotEntries = Object.entries(robot);
console.log(robotEntries);

    // Object.assign(target, source) – Copies properties from one object into another
const newRobot = Object.assign({laserBlaster: true, voiceRecognition: true}, robot);
console.log(newRobot);

/*
The object that a method belongs to is called the calling object.
The this keyword refers to the calling object and can be used to access properties of the calling object.
Methods do not automatically have access to other internal properties of the calling object.
The value of this depends on where the this is being accessed from.
We cannot use arrow functions as methods if we want to access other internal properties.
JavaScript objects do not have built-in privacy — however, there are conventions to follow to notify other developers about the intent of the code.
The usage of an underscore before a property name means that the original developer did not intend for that property to be directly changed.
Setter and getter methods allow for more detailed ways of accessing and assigning properties.
Factory functions allow us to create object instances quickly and repeatedly.
There are different ways to use object destructuring: one way is the property value shorthand and another is destructured assignment.
*/

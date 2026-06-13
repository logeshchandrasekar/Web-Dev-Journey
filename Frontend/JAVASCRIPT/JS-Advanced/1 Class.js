//General Structure of a class !
class Dog {
  constructor(name) {
    this._name = name;
    this._behavior = 0;
  }

  get name() {
    return this._name;
  }
  get behavior() {
    return this._behavior;
  }   

  incrementBehavior() {
    this._behavior ++;
  }
}

const tiger = new Dog('Tiger');
console.log(tiger.name); // Print name value to console
console.log(tiger.behavior); // Print behavior value to console
tiger.incrementBehavior(); // Add one to behavior
console.log(tiger.name); //Print name value to console
console.log(tiger.behavior); // Print behavior value to console

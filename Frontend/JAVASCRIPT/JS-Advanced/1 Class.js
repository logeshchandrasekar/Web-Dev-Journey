//General Structure of a class with getters and methods.
class Surgeon {
  constructor(name, department) {
    this._name = name;
    this._department = department;
    this._remainingVacationDays = 20;
  }

  // getters in class
  get name() {
    return this._name;
  }
  
  get department() {
    return this._department;
  }
  
  get remainingVacationDays() {
    return this._remainingVacationDays;
  }

  // method in class
  takeVacationDays(daysOff) {
    this._remainingVacationDays -= daysOff;
  }
}

const surgeonLogesh = new Surgeon('Logeshwar', 'Cardiovascular'); // new instance
const surgeonChandru = new Surgeon('Chandrasekar', 'Orthopedics'); // new instance

console.log(surgeonLogesh.name); //logs name
console.log(surgeonLogesh.department); //logs department
surgeonLogesh.takeVacationDays(3); // updates input
console.log(surgeonlogesh.remainingVacationDays); // logs new value

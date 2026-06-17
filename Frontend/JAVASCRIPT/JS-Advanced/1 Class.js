// General Class Structure is written

// Superclass :
class HospitalEmployee {
  constructor(name) {
    this._name = name; // use underscore after this. keyword to make the property private, always use ._
    this._remainingVacationDays = 20;
  }
  // getter
  get name() {
    return this._name;
  }
  get remainingVacationDays() {
    return this._remainingVacationDays;
  }
  // method
  takeVacationDays(daysOff) {
    this._remainingVacationDays -= daysOff;
  }
}
// Subclass :
class Nurse extends HospitalEmployee { // here 'extends' makes the Nurse class inherits the Superclass's properties
  constructor(name, certifications) {
    super(name); // super refers to the constructor of the superclass which gets called in subclass
    this._certifications = certifications;
  }
  // getter
  get certifications() {
    return this._certifications;
  }
  // method
  addCertification(newCertification){
    this._certifications.push(newCertification);
  }
}

const nursePriya = new Nurse('Priya', ['Trauma','Pediatrics']); // An instance created using subclass
nursePriya.takeVacationDays(5); // calling a method in super class, then inputs '5'
console.log(nursePriya.remainingVacationDays); // logs value by using a getter from superclass
nursePriya.addCertification('Genetics'); // adding a array input in the instance using a method from subclass
console.log(nursePriya.certifications); // logs the values from the instance using a getter from subclass

/*
- Classes are templates for objects
- JavaScript calls a constructor method when we create a new instance of a class.
- Inheritance is when we create a parent class with properties and methods that we can extend to child classes.
- We use the extends keyword to create a subclass.
- The super() method calls the constructor() of a parent class.
- we can create as many subclasses as we want including getters and methods in it.
- Reason for using a superclass is
 -- better readability 
 -- reducing number of lines
 -- to make convenient changes on common properties shared by many subclasses.
*/

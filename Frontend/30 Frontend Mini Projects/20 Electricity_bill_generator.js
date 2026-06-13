/* Electricity charges per units :
- 1-100 units = ₹0
- 101-200 units = ₹2
- 201+ units = ₹4 */

let unitsUsed = 250;

if(unitsUsed <= 0) {
    console.log('No units of electricity consumed, bill = 0');
}

else if(unitsUsed <= 100) {
    let bill = 0;
    console.log(`Units consumed = ${unitsUsed}, bill = ${bill}`);
}

else if(unitsUsed <= 200) {
    let bill = (unitsUsed-100)*2;
    console.log(`Units consumed = ${unitsUsed}, bill = ${bill}`);
}

else {
    let bill = ((unitsUsed-200)*4) + (100*2);
    console.log(`Units consumed = ${unitsUsed}, bill = ${bill}`);
}
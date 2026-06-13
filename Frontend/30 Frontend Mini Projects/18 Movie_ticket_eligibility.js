let age = 22;

if (age <= 0) {
    console.log('Invalid age')
}
else if (age < 18){
    console.log('Eligible to Child Ticket')
}
else if (age >= 18 && age <= 59){
    console.log('Eligible to Adult Ticket')
}
else{
    console.log('Eligible to Senior Citizen Ticket')
};
const record = [
{
    name: 'Loki',
    marks: 82
},
{
    name: 'John',
    marks: 90
},
{
    name: 'Mickey',
    marks: 75
},
{
    name: 'Cocoa',
    marks: 48
}
];

let topper = record[0];
let total = 0;
let passMark = 50;

// to find the topper !!
for(let i = 1; i < record.length; i++) {
    if(record[i].marks > topper.marks) {
        topper = record[i];
    }
}

// to find average marks !!
for(let i = 0; i < record.length; i++) {
    total = total + record[i].marks;
}
let avg = total/record.length;

// to find passed & failed students !!
let passCount = 0;
let failCount = 0;
for(let i = 0; i < record.length; i++) {
    if(record[i].marks >= passMark){
        passCount += 1;
    }
    else{
        failCount += 1;
    }
}

console.log('Class topper - ' + topper.name);
console.log('Class total is - ' + total +'/'+ record.length*100);
console.log('Average marks of the class - ' + avg);
console.log('Total no of students passed - ' + passCount);
console.log('Total no of students failed - ' + failCount);
const marks = [91,92,93,94,95,96];
let total = 0;

for( let i = 0; i < marks.length; i++){
    total = total + marks[i];
}

let avg = total/marks.length;
console.log(avg);
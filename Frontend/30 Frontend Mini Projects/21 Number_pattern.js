const num = 5;
for (let i = 1; i <= num; i++) {
    let row = '';
    for (let j = 1; j <= i; j++) {
        row = row + j + ' ';
    }
    console.log(row);
}
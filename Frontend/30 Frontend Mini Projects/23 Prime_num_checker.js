const num = 4;
let isPrime = true;

if(num < 2){
    isPrime = false;
}
else {
    for(let i = 2; i <= num/2; i++){
        if(num % i == 0){
            isPrime = false;
            break;
        }
    }
}

if (isPrime) {
    console.log(num + ' is a prime');
}
else {
    console.log(num + ' is not a prime');
}
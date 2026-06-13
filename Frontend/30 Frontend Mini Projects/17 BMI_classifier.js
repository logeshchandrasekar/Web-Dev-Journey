let weight = 67;
let height = 1.7;

let bmi = (weight/height**2).toFixed(1);

if(bmi < 18.5){
    console.log(`Your bmi is ${bmi} - Underweight`);
}

else if(bmi >= 18.5 && bmi <= 24.9){
    console.log(`Your bmi is ${bmi} - Normal weight`);
}

else if(bmi >= 25.0 && bmi <= 29.9){
    console.log(`Your bmi is ${bmi} - Overweight`)
}

else{
    console.log(`Your bmi is ${bmi} - Obese`)
};
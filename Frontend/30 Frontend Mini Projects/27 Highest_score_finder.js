const score =[50,80,60,70,40];
let high = score[0];

for(let i = 0; i < score.length; i++){
    if(score[i] > high){
        high = score[i];
    }
}
console.log('Highest Score is : ' + high);
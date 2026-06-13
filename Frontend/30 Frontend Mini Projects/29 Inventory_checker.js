const items = ['mouse','keyboard','monitor','laptop'];
let toFind = 'keyboard';
let found = false;

for ( let i = 0; i < items.length; i++) {
    if(items[i] === toFind){
        found = true;
        break;
    }
}

if(found){
    console.log('Yes, item found');
}
else{
    console.log('Item not found');
}
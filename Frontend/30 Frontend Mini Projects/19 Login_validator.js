let username = 'loki';
let password = 'loki08';

if (username === '' || password === '') {
    console.log('Please enter credentials !')
}

else if(username === 'loki' && password === 'loki08') {
    console.log('Login Successful')
}

else{
    console.log('Invalid Credentials')
}
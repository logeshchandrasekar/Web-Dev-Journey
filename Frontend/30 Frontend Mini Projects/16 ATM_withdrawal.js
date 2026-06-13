let accountBalance = 5000;
let userWithdrawal = 5000;
let remainingBalance = accountBalance-userWithdrawal;

if (userWithdrawal <= 0) {
    console.log('Invalid amount');
}
else if (accountBalance >= userWithdrawal) {
    console.log('Transaction successful');
    console.log(`Balance = ${remainingBalance}`);
}
else {
    console.log('Insufficient funds');
};
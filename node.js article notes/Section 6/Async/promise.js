const p = new Promise((resolve, reject) => {
    // Do some async work
    setTimeout(() => {
        resolve(1); // Return Output - 1
        reject(new Error('Some error')) // Return Error
    }, 2000);
    
});

p
    .then(result => console.log(`Result : ${result}`))
    .catch(err => console.log(`Error : ${err.message}`))

// Parallel Promises

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...')
        resolve(1); // Return Output - 1
        // reject(new Error('Some error')) // Return Error
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 2...')
        resolve(2); // Return Output - 1
        // reject(new Error('Some error')) // Return Error
    }, 2000);
});

// Promise.all([p1, p2])
//     .then(result => console.log(result))
//     .catch(err => console.log(`Errpr : ${err.message}`))

OUTPUT
'''
Async operation 1...
Async operation 2...
[ 1, 2 ]
'''

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(`Errpr : ${err.message}`))

OUTPUT
'''
// Async operation 1...
// 1
// Async operation 2...
'''

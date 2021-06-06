const bcrypt = require('bcrypt')

// SALT - Random string added before or added password.

async function generateSalt(){
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    hashed_pwd = await bcrypt.hash('Password', salt);
    console.log(salt, hashed_pwd);
}

generateSalt()
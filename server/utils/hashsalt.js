const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('password', salt);

const password = 'password';

const isMatch = bcrypt.compareSync(password, hash);

if(isMatch) {
    console.log('Password Match');
} else {
    console.log('Password does not match');
}

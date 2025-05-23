const register = require('./register');
const getUser = require('./getUser');
const getEmailUser = require('./getUserByEmail');
const getUserParam = require('./getUserbyParam');
const update = require('./update');
const hapus = require('./delete');

module.exports = {
    register,
    getUser,
    getEmailUser,
    getUserParam,
    update,
    hapus
}
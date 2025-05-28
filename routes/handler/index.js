const register = require('./register');
const getUser = require('./getUser');
const getEmailUser = require('./getUserByEmail');
const getUserParam = require('./getUserbyParam');
const update = require('./update');
const hapus = require('./delete');
const login = require('./login');

module.exports = {
    register,
    getUser,
    getEmailUser,
    getUserParam,
    update,
    hapus,
    login,
}
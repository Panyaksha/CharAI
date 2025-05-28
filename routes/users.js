const express = require('express');
const router = express.Router();

const userHandler = require('./handler');
const verify = require('../middleware/VerifyTokens');

router.post('/register',userHandler.register);
router.get('/',verify,userHandler.getUser);
router.post('/email',verify,userHandler.getEmailUser);
router.get('/param',userHandler.getUserParam);
router.put('/update/:id',verify,userHandler.update);
router.delete('/hapus/:id',userHandler.hapus);
router.post('/login',userHandler.login);

module.exports = router;

const express = require('express');
const router = express.Router();

const userHandler = require('./handler');

router.post('/register',userHandler.register);
router.get('/',userHandler.getUser);
router.post('/email',userHandler.getEmailUser);
router.get('/param',userHandler.getUserParam);
router.put('/update/:id',userHandler.update);
router.delete('/hapus/:id',userHandler.hapus);

module.exports = router;

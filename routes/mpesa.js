const express = require('express');
const router = express.Router();


const {mpesaPassword, stkPush, token} = require('../controllers/mpesaController');

router.get( '/password',

 mpesaPassword,
token,
stkPush,
);
router.post('/stk/push' , 
token , 
stkPush);

module.exports = router;
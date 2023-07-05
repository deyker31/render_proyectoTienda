const express = require('express');
const { captureOrder, cancelPayment, createOrder } = require('../controllers/control.js');

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/capture-order', captureOrder);  
router.get('/cancel-order', cancelPayment);


module.exports = router;

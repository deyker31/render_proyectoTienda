/*
import {Router} from 'express';
import { cancelPayment, captureOrder, createOrder } from '../controllers/control.mjs';
const router = Router();

router.get('/create-order', createOrder);
router.get('/capture-order', captureOrder);
router.get('/cancel-order', cancelPayment);



export default router; 
*/

const express = require('express');
const { captureOrder, cancelPayment, createOrder } = require('../controllers/control.js');

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/capture-order', captureOrder);  
router.get('/cancel-order', cancelPayment);


module.exports = router;

/*
import {Router} from 'express';
import { cancelPayment, captureOrder, createOrder } from '../controllers/control.mjs';
const router = Router();

router.post('/create-order', createOrder);
router.get('/capture-order', captureOrder);
router.get('/cancel-order', cancelPayment);



export default router; */


const express = require('express');
const router = express.Router();

const { cancelPayment, captureOrder, createOrder } = require('../controllers/control.js');


router.get('/paypal/create-order', createOrder);
router.get('/paypal/capture-order', captureOrder);
router.get('/paypal/cancel-order', cancelPayment);



module.exports = router;
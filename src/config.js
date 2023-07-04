
/*
import {config} from "dotenv";
config();

export const PORT = 3005;

export const HOST = 'http://localhost:' +PORT

export const PAYPAL_API_CLIENT= process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET= process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = "https://api-m.sandbox.paypal.com";
*/

const {config} = require("dotenv");
config();

const HOST = 'https://capstyle.onrender.com'
module.exports = HOST;

const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
module.exports = PAYPAL_API_CLIENT;
const PAYPAL_API_SECRET= process.env.PAYPAL_API_SECRET;
module.exports = PAYPAL_API_SECRET;
const PAYPAL_API = "https://api-m.sandbox.paypal.com";
module.exports = PAYPAL_API;
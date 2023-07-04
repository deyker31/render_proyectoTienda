
/*
import {config} from "dotenv";
config();

export const PORT = 3001;

export const HOST = 'http://localhost:' +PORT

export const PAYPAL_API_CLIENT= process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET= process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = "https://api-m.sandbox.paypal.com";
*/
const dotenv = require('dotenv');
dotenv.config();

const PORT = 3001;

//const HOST = 'http://localhost:' + PORT + '/paypal'; //url desarrollo
const HOST = "https://capstyle.onrender.com/paypal";  //url producccion

//const url2 = "http://localhost:3001" //url desarrollo
const url2 = "https://capstyle.onrender.com" //url produccion

const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;

const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;

const PAYPAL_API = "https://api-m.sandbox.paypal.com";

module.exports = {
  PORT,
  HOST,  
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  PAYPAL_API,
  url2
};

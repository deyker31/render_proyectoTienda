import {config} from "dotenv";
config();

export const PORT = 3005;

export const HOST = 'http://localhost:' +PORT

export const PAYPAL_API_CLIENT= process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET= process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = "https://api-m.sandbox.paypal.com";

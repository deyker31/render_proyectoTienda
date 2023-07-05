const { HOST, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, url2 } = require("../config");
const axios = require("axios");

const url = `${PAYPAL_API}/v2/checkout/orders`; // url orden paypal api

//extraer precioTotal

let data;

async function fetchData() {
  data = await getData();
  //console.log(data);
}

async function getData() {
  const urld = url2+'/apiServer/registros'; 
  const respuesta = await fetch(urld);
  const data = await respuesta.json();
  return data;
}

fetchData();

//AccesToken

let accessToken;

async function getAccessToken() {
  const params = new URLSearchParams();   
  params.append('grant_type','client_credentials');

  const {data: {access_token}} = await axios.post( 
    `${PAYPAL_API}/v1/oauth2/token`,  
    params, {     
    auth: {     
      username: PAYPAL_API_CLIENT,     
      password: PAYPAL_API_SECRET    
    }   
  }); 

  return access_token;  
}

async function callFunction() {
  accessToken = await getAccessToken();
}

callFunction();


const createOrder = async (req, res) => {
    try {
      
      const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: data[0].precioTotal2
                },
            },
        ],
        application_context: {
            brand_name: "CapStyle",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${HOST}/capture-order`,
            cancel_url: `${HOST}/cancel-order`,
          },
    };

    const response = await axios.post(url, order, {
      timeout: 8000,
      headers:{
        Authorization: `Bearer ${accessToken}`
    }
      
    })

    //console.log(response.data)
    return res.json(response.data);

    } catch (error) {
      if(error.code === 'ECONNABORTED') {    
        setTimeout(() => {
          createOrder(req, res) 
        }, 5000)}
    }
    

    
}


const captureOrder = async (req, res) => {
    const { token } = req.query;
  
    try {
      
      const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          timeout: 8000, // Aumentamos el timeout 
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
          },
        }
      );  

      //tambien puedo enviar la respuesta a la bd
      //console.log(response.data);
  
      res.redirect(url2 + "/alerta");//cuando este pagado me mandara al inicio
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal Server error" });
    }
  };
const cancelPayment = async (req, res) => {
  res.redirect(url2 + "/pago/alerta");
};

module.exports = {
  createOrder,
  captureOrder,
  cancelPayment
}
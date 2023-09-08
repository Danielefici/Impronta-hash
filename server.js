require('dotenv').config();  // Carica le variabili d'ambiente da un file .env


const axios = require('axios');  // Importa il modulo Axios per effettuare richieste HTTP
const crypto = require('crypto');  // Importa il modulo Crypto per la crittografia
const moment = require('moment');  // Importa il modulo Moment per la manipolazione delle date e degli orari



const apiKey = process.env.apiKey;  // Ottiene l'API Key dall'ambiente
const apiSecret = process.env.apiSecret;  // Ottiene l'API Secret dall'ambiente
const apiEndpoint = '************';  // Endpoint dell'API di test
const date = new Date();  // Ottiene la data corrente

const hmac = crypto.createHmac('sha256', apiSecret);  // Crea un oggetto HMAC con l'algoritmo SHA256 e l'API Secret
const dataOra = moment(date).format('YYYY-MM-DD HH:mm:ss');  // Formatta la data corrente come stringa
const timestamp = moment(date).unix();  // Ottiene il timestamp Unix della data corrente
hmac.update(`${apiKey}${apiSecret}${timestamp}`);  // Calcola l'HMAC concatenando l'API Key, l'API Secret e il timestamp
const signature = hmac.digest('hex');  // Ottiene la firma HMAC come stringa esadecimale

const headersRequest = {    
  method: 'POST',
  url: apiEndpoint,
  headers: {           // Parametri nell'header della richiesta
    'chiave': apiKey,
    'firma': signature,
    'dataora-richiesta': dataOra,
    'Accept': 'application/json',
    'versione': 1,
    'tipo_risposta': 'json'
  }
}

const sendPostRequest = async () => {
  try {
      const resp = await axios.post( apiEndpoint, {}, headersRequest);
      console.log(resp.data);
  } catch (err) {
      
      console.error(err);
  }
};

sendPostRequest();


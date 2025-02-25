import axios from 'axios';

const cliente = axios.create({
  baseURL: "https://criptoya.com",
});

export default {
  getPrecios(cripto, volumen, exchange) {
    return cliente.get(`/api/${cripto}/ars/${volumen}?exchange=${exchange}`)
      .then(response => {
        console.log("Respuesta de la API:", response.data); 
        return response;  
      })
      .catch(error => {
        console.error("Error en la solicitud de precios:", error);
        throw error;  
      });
  }
};

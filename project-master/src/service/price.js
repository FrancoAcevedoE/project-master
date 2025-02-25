import axios from 'axios';

const cliente = axios.create({
  baseURL: "https://criptoya.com",
});

export default {
  getPrecios(cripto, volumen, exchange) {
    return cliente.get(`/api/${cripto}/ars/${volumen}?exchange=${exchange}`)
      .then(response => {
        // Verifica que la respuesta es la que esperas
        console.log("Respuesta de la API:", response.data);  // Esto te ayudará a ver qué datos recibes
        return response;  // Devuelve la respuesta tal como está
      })
      .catch(error => {
        console.error("Error en la solicitud de precios:", error);  // Si hay un error, lo verás aquí
        throw error;  // Lanzar el error para manejarlo en el componente
      });
  }
};

// service/servicios.js
import axios from "axios";

const clienteAPI = axios.create({
  baseURL: "https://laboratorio3-f36a.restdb.io/rest/",
  headers: { "x-apikey": "64bdbb6f86d8c5e18ded91e3" },
});

export default {
  getTransaccion(user) {
    return clienteAPI.get(`/transactions?q={"user_id": "${user}"}`);
  },

  getTransaccionId(id) {
    return clienteAPI.get(`/transactions/${id}`);
  },

  postTransaccion(user, accion, tipo, cantidad, precio, fecha) {
    return clienteAPI.post("/transactions", {
      user_id: user,
      action: accion,
      crypto_code: tipo,
      crypto_amount: cantidad,
      money: precio,
      datetime: fecha,
    });
  },

  deleteTransaccion(id) {
    return clienteAPI.delete(`/transactions/${id}`);
  },
};
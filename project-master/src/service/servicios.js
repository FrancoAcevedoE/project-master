import axios from "axios";


const clienteAPI = axios.create({
  baseURL: "https://laboratorio3-f36a.restdb.io/rest",
  headers: { "x-apikey": "60eb09146661365596af552f" },
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
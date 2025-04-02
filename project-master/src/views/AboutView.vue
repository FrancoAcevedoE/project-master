
<template>
  <div class="about">
    <h1>Historial de Transacciones</h1>
    <ul class="transaction-list">
      <li v-for="(transaction, index) in transactionHistory" :key="index">
        <span v-if="transaction.crypto_amount && transaction.crypto_code && transaction.money">
          {{ transaction.action === "purchase" ? "Compra" : "Venta" }}
          {{ transaction.crypto_amount }} {{ transaction.crypto_code }} a ${{ transaction.money }}
          el {{ new Date(transaction.datetime).toLocaleString() }}
        </span>
        <span v-else>
          Transacción incompleta
        </span>
      </li>
      <li v-if="transactionHistory.length === 0">No hay transacciones registradas</li>
    </ul>
    <div>
      <button class="btn btn-red">Modificar</button>
      <button class="btn btn-dark">Eliminar</button>
    </div>
  </div>
</template>

<script>
import servicios from "@/service/servicios";  // Para las transacciones

export default {
  name: "AboutView",
  data() {
    return {
      userId: localStorage.getItem("userId") || null,
      transactionHistory: [],
      selectedTransaction: null,
    };
  },
  methods: {
    async loadTransactionHistory() {
      if (!this.userId) {
        console.error("No se encontró el ID de usuario en el localStorage.");
        return;
      }

      //const apiKey = '60eb09146661365596af552f'; // Reemplaza 'YOUR_API_KEY' con tu clave de API real
      //const endpoint = `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id": "${this.userId}"}`;

      try {
        const response = await servicios.getTransaccion(this.userId);
        if (response.status !== 200) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        this.transactionHistory = response.data;
      } catch (error) {
        console.error("Hubo un problema al obtener el historial de transacciones:", error);
      }
    },
    //esto va aca adentro o va afuera del otro metodo?
    methodTransaction(transaction) {
      this.selectedTransaction = transaction;
    },
    async modifyTransaction() {
      if (!this.selectedTransaction) return;
      if (confirm("¿Está seguro de que desea modificar esta transacción?")) {
        this.transactionHistory = this.transactionHistory.filter(
          (transaction) => transaction !== this.selectedTransaction
        );
        this.selectedTransaction = null;  

        console.error("No se encontró el ID de usuario en el localStorage.");
        return;
      }
      // Implementar la lógica para modificar una transacción
      alert("Función de modificación no implementada.");
    },
    async deleteTransaction() {
      // Implementar la lógica para eliminar una transacción
      alert("Función de eliminación no implementada.");
    },
  },
  mounted() {
    this.loadTransactionHistory();
  },
};
</script>

<style>
.about {
  display: flex;
  flex-direction: column;
  background-color: #4ecdc4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 1px #d7d7d78c;
  max-width: 600px;
  margin: auto;
}

.transaction-list {
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.2);
  list-style: none;
}

.transaction-list li {
  padding: 5px;
  border-bottom: 1px solid #ddd;
}

.transaction-list li:last-child {
  border-bottom: none;
}

span {
  display: flex;
  justify-content: space-between;
  color: #000;
}
</style>

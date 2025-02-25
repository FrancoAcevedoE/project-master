<template>
  <div class="about">
    <h1>Historial de Transacciones</h1>
    <ul>
      <li v-for="(transaction, index) in transactionHistory" :key="index">
        {{ transaction.action === "purchase" ? "Compra" : "Venta" }} 
        {{ transaction.crypto_amount }} {{ transaction.crypto_code }} a ${{ transaction.money }} 
        el {{ transaction.datetime }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  data() {
    return {
      transactionHistory: [],
    };
  },
  methods: {
    loadTransactionHistory() {
      const storedHistory = localStorage.getItem("transactionHistory");
      if (storedHistory) {
        this.transactionHistory = JSON.parse(storedHistory);
      }
    },
  },
  mounted() {
    this.loadTransactionHistory(); // Cargar historial al montar
  },
};
</script>

<style>
.about {
  background-color: #4ecdc4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 1px #d7d7d78c;
}
</style>
<template>
  <div class="about">
    <h1>Historial de Transacciones</h1>
    <ul class="transaction-list">
      <li v-for="(transaction, index) in transactionHistory" :key="index">
        <span v-if="transaction.crypto_amount && transaction.crypto_code && transaction.money">
          {{ transaction.action === "purchase" ? "Compra" : "Venta" }} 
          {{ transaction.crypto_amount }} {{ transaction.crypto_code }} a ${{ transaction.money }} 
          el {{ transaction.datetime }}
        </span>
        <span v-else>
          Transacción incompleta
        </span>
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
  background: rgb(255, 255, 255);
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
  color: #000000;
}

</style>

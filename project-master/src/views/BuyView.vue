<template>
  <div class="crypto-form">
    <h1>{{ transactionType === "buy" ? "Comprar" : "Vender" }}</h1>

    <div class="transaction-type">
      <button @click="transactionType = 'buy'" :class="{ active: transactionType === 'buy' }">Comprar</button>
      <button @click="transactionType = 'sell'" :class="{ active: transactionType === 'sell' }">Vender</button>
    </div>

    <div class="walletCoin">
      <label>Saldo disponible:</label>
      <input type="text" :value="`$${walletBalance.toFixed(2)}`" readonly />
    </div>

    <div class="cryptoBalance" v-if="selectedCrypto">
      <label>Cantidad de {{ selectedCrypto }}:</label>
      <input type="text" :value="cryptoBalances[selectedCrypto]?.toFixed(2) || 0" readonly />
    </div>

    <div v-if="loading">Cargando criptomonedas...</div>
    <div v-else>
      <div class="form-group">
        <label>Seleccionar Criptomoneda</label>
        <select v-model="selectedCrypto" @change="fetchPrice">
          <option disabled value="">Seleccione una criptomoneda</option>
          <option v-for="crypto in availableCryptos" :key="crypto.symbol" :value="crypto.symbol">
            {{ crypto.name }} ({{ crypto.symbol }})
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Cantidad</label>
        <input type="number" v-model="amount" step="0.01" />
      </div>

      <div v-if="cryptoPrice">
        <p>Precio: ${{ cryptoPrice }}</p>
      </div>

      <button @click="submitTransaction">
        {{ transactionType === "buy" ? "Confirmar Compra" : "Confirmar Venta" }}
      </button>
    </div>
  </div>
</template>

<script>
import servicios from "@/service/servicios";  // Para las transacciones
import precios from "@/service/price";       // Para obtener precios

export default {
  name: "BuyView",
  data() {
    return {
      transactionType: "buy",
      availableCryptos: [
        { symbol: "BTC", name: "Bitcoin" },
        { symbol: "ETH", name: "Ethereum" },
        { symbol: "LTC", name: "Litecoin" }
      ],
      selectedCrypto: "",
      amount: null,
      walletBalance: 10099990.0,
      cryptoBalances: {},
      cryptoPrice: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchCryptos() {
      this.loading = true;
      try {
        this.availableCryptos = [
          { symbol: "BTC", name: "Bitcoin" },
          { symbol: "ETH", name: "Ethereum" },
          { symbol: "LTC", name: "Litecoin" }
        ];
      } catch (error) {
        console.error("Error al obtener criptomonedas:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchPrice() {
  if (!this.selectedCrypto) {
    console.error("No se ha seleccionado una criptomoneda.");
    return;
  }

  this.loading = true;
  this.error = null;

  try {
    const response = await precios.getPrecios(this.selectedCrypto, 1, "binance");


    const price = response.data.binance.totalAsk || response.data.binance.totalAsk  || 0;
    if (price > 0) {
      this.cryptoPrice = price;
    } else {
      this.error = "Precio inválido";
      
      console.error("Precio inválido:", price);
      this.cryptoPrice = null;
    }
    console.log("prueba",response.data.binance.ask);
    
    console.log("Precio cargado:", this.cryptoPrice);  // Verifica el precio cargado
  } catch (error) {
    this.error = "Error al obtener el precio";
    console.error("Error en fetchPrice:", error);
    this.cryptoPrice = null;
  } finally {
    this.loading = false;
  }
},

async submitTransaction() {
  if (!this.selectedCrypto || !this.amount || this.amount <= 0 || !this.cryptoPrice) {
    alert("Ingrese una cantidad válida y asegúrese de que el precio esté cargado.");
    return;
  }

  const amount = parseFloat(this.amount);
  const price = this.cryptoPrice;
  const now = new Date();
  const formattedDate = now.toLocaleString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const transaction = {
  user_id: String(localStorage.getItem("userId")),  
  action: "sale", 
  crypto_code: this.selectedCrypto.toLowerCase(),
  crypto_amount: amount.toFixed(2), 
  money: price.toFixed(2),  
  datetime: formattedDate.replace(/\//g, "-") 
};


console.log("Datos enviados a la API:", JSON.stringify(transaction, null, 2));

  try {
    const response = await servicios.postTransaccion(
      transaction.user_id,
      transaction.action,
      transaction.crypto_code,
      transaction.crypto_amount,
      transaction.money,
      transaction.datetime
    );

    console.log("Respuesta de la API:", response);
    if (response && response.status === 201) {
      alert("Transacción guardada exitosamente");
      console.log("Datos enviados a la API:", JSON.stringify(transaction, null, 2));

      // Guarda en el localStorage
      let history = JSON.parse(localStorage.getItem("transactionHistory")) || [];
      history.push(transaction);

      let balances = JSON.parse(localStorage.getItem("cryptoBalances")) || {};
      if (!balances[this.selectedCrypto]) {
        balances[this.selectedCrypto] = 0;
      }
      if (this.transactionType === "buy") {
        balances[this.selectedCrypto] += amount; // Sumar si es compra
      } else if (this.transactionType === "sell") {
        balances[this.selectedCrypto] -= amount; // Restar si es venta
      }
      localStorage.setItem("cryptoBalances", JSON.stringify(balances));

      
      localStorage.setItem("transactionHistory", JSON.stringify(history));
    } else {
      console.log("Datos enviados:", {
  user_id: transaction.user_id,
  action: transaction.action,
  crypto_code: transaction.crypto_code,
  crypto_amount: transaction.crypto_amount,
  money: transaction.money,
  datetime: transaction.datetime
});

      alert("Error al guardar la transacción.");
    }
  } catch (error) {
  if (error.response) {
    console.error("Detalles del error de la API:", error.response.data);
  } else {
    console.error("Error al enviar los datos de la transacción a la API:", error);
  }
  alert("Hubo un problema al guardar la transacción.");
}

},
  },
  mounted() {
    this.fetchCryptos();
    const storedBalances = localStorage.getItem("cryptoBalances");
  if (storedBalances) {
    this.cryptoBalances = JSON.parse(storedBalances);
  }
  },
};
</script>

<style>

.transaction-type {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.transaction-type .button {
  margin: 5px;
  padding: 20px;
}
.walletCoin {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.walletCoin input {
  width: 250px;
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 590px;  
  box-shadow: 0 5px 5px rgba(203, 34, 34, 0.2);
}
.cryptoBalance {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  box-shadow: 0 5px 5px rgba(203, 34, 34, 0.2);
}
.cryptoBalance input {
  width: 250px;
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;  
  box-shadow: 0 5px 5px rgba(203, 34, 34, 0.2);
}
.crypto-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;  
}
.crypto-form button {
  padding: 5px;
  margin: 5px;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  box-shadow: 0 5px 5px rgba(203, 34, 34, 0.2);
  cursor: pointer;
}

.crypto-form button:hover {
  background-color: #0056b3;
  box-shadow: 0 5px 5px rgba(203, 34, 34, 0.2);
}

 .form-group .input {
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 590px;  
  box-shadow: 0 5px 5px rgba(203, 34, 34, 0.2);
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}
.form-group select {
  width: 250px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 590px;  
  box-shadow: 0 5px 5px rgba(203, 34, 34, 0.2);
}
.active {
  background-color: #007bff;
  color: white;
}

.form-group input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 590px;  
  box-shadow: 0 5px 5px rgba(203, 34, 34, 0.2);
}

</style>
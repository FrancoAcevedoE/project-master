<template>
  <div class="form-container login">
    <form @submit.prevent="handleLogin" class="custom-form">
      <h2>Iniciar Sesión</h2>
      <input type="number" v-model="userId" placeholder="INGRESE ID NUMÉRICO" required />
      <button type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
    };
  },
  methods: {
    handleLogin() {
  const userIdString = String(this.userId).trim(); // Convertimos a string y aplicamos trim
  if (userIdString >0 && userIdString !== "") {
    this.$store.dispatch("login", userIdString); 
    this.$emit("login-success");
  }else if (userIdString <=0 || userIdString == ""){
    alert("Ingrese un ID mayor a 0");
  }
},
  },
  mounted() {
    this.$store.dispatch("loadUserId"); // Cargar el ID si está en localStorage
  }
};
</script>

<style>
.form-container {
  display: flex;
  text-align: center;
}

form input{
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 590px;
  border: 1px solid #ccc;
}
form button {
  width: 120px;
  padding: 10px;
  border-radius: 590px;
  border: none;
  background-color: #e74c3c;
  color: white;
}
form button:hover {
  background-color: #c0392b;
}
/* Estilos del formulario */
.login {
  display: flex;
  background-color: #4ecdc4;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
}

button {
  color: white;
  
  background-color: #e74c3c;
}

button:hover {
  background-color: #c0392b;
}
</style>

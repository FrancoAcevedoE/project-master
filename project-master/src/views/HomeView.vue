<template>
  <div class="container-fluid">
    <div v-if="!loggedIn" class="center-content">
      <LoginForm @login-success="checkLoginStatus" />
    </div>

    <div v-else class="container center-content">
      <nav>
        <router-link to="/historial" >Historial</router-link> |
        <router-link to="/comprar" >Comprar/Vender</router-link> |
        <button class="button" @click="logout">Cerrar sesión</button>
      </nav>

      <router-view></router-view> <!-- Aquí se renderizan las vistas internas -->
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "HomeView",
  components: { LoginForm },
  data() {
    return {
      loggedIn: !!localStorage.getItem("userId"), // Estado reactivo
    };
  },
  methods: {
    checkLoginStatus() {
      this.loggedIn = !!localStorage.getItem("userId"); // Actualiza la variable reactiva
    },
    logout() {
      localStorage.removeItem("userId");
      this.loggedIn = false; // Forzamos la actualización
    }
  }
};
</script>

<style>

.container-fluid{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container {
  background-color: #4ecdc4;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #b0b0b0;
  box-shadow: 1px 1px 10px 1px #d7d7d78c;
}

.container:hover {
  box-shadow: 1px 1px 10px 1px rgba(216, 139, 255, 0.548);
  transform: scale(1.01);
  transition: 0.1s;
}

.button {
  background-color: #8f3de0;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  margin: 10px;
}
button:hover {
  background-color: #6a1b9a;
}
nav a:link, nav a:visited {
  text-decoration: none; /* Elimina el subrayado */
  color: #ffffff; /* Asegura que tenga color */
  padding: 5px;
  margin: 5px;
  border-radius: 20px;
  background-color: #8f3de0;
  display: inline-block;
}

nav a:hover {
  background-color: #6a1b9a;
}

</style>
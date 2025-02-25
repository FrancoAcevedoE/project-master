// src/store/store.js
import { createStore } from 'vuex'; // Usamos createStore para Vue 3
import CryptoJS from 'crypto-js';

const store = createStore({
  state() {
    return {
      userId: null, // Este es el estado para guardar el ID del usuario
      secretKey: 'mi_clave_secreta', // Cambiar por una clave más segura
    };
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
    login({ commit }, userId) {
      const encryptedUserId = CryptoJS.AES.encrypt(userId, this.state.secretKey).toString();
      localStorage.setItem('userId', encryptedUserId); // Guardar en localStorage
      commit('setUserId', encryptedUserId); // Establecer en el estado de Vuex
    },
    logout({ commit }) {
      localStorage.removeItem('userId'); // Eliminar el ID en localStorage
      commit('setUserId', null); // Limpiar el estado de Vuex
    },
    loadUserId({ commit }) {
      const encryptedUserId = localStorage.getItem('userId');
      if (encryptedUserId) {
        const bytes = CryptoJS.AES.decrypt(encryptedUserId, this.state.secretKey);
        const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);
        commit('setUserId', decryptedUserId); // Establecer el usuario desencriptado
      }
    },
  },
  getters: {
    getUserId: (state) => {
      return state.userId;
    },
  },
});

export default store;

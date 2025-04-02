// src/store/store.js
import { createStore } from 'vuex'; // Usamos createStore para Vue 3
import CryptoJS from 'crypto-js';

const store = createStore({
  state() {

    return {
      userId: null, // Este es el estado para guardar el ID del usuario
    };
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
    login({ commit }, userId) {
      const encryptedUserId = CryptoJS.SHA256(userId).toString();
      localStorage.setItem('userId', encryptedUserId); // Guardar en localStorage
      commit('setUserId', encryptedUserId); // Establecer en el estado de Vuex
    },
    logout({ commit }) {
      localStorage.removeItem('userId'); // Eliminar el ID en localStorage
      commit('setUserId', null); // Limpiar el estado de Vuex
    },
    loadUserId({ commit }) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        commit('setUserId', storedUserId);
      }
    },
  },
  getters: {
    getUserId: (state) => state.userId,
  },
});

export default store;

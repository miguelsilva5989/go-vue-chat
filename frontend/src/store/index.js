import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      messages: [],
      reconnectError: false,
      messageId: 0,
    },
  },
  getters: {
    getMessages: (state) => {
      return state.socket.messages;
    },
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    ADD_MESSAGE(state, payload) {
      console.log(payload);
      console.log(state.socket.messages);
      state.socket.messageId++
      state.socket.messages.push({ "id": state.socket.messageId, "data": payload.message, "username": payload.username });
    },
  },
  actions: {
    sendMessage({ commit }, payload) {
      Vue.prototype.$socket.send(payload.message);
      commit('ADD_MESSAGE', payload);
    },

  },
});

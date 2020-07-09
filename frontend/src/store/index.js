import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      messages: [],
      message: '',
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
    ADD_MESSAGE(state, message) {
      console.log(message);
      console.log(state.socket.messages);
      state.socket.messages.push({"id": state.socket.messageId, "data": message});
      state.socket.messageId++
    }
  },
  actions: {
    sendMessage({ commit }, message) {
      Vue.prototype.$socket.send(message);
      commit('ADD_MESSAGE', message);
    },
  },
});

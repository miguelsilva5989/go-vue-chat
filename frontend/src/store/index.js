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
      message: {},
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
      var msg = {};

      try {
        msg = JSON.parse(JSON.parse(message.data).body);
      } catch (e) {
        msg.username = '';
        msg.message = '';
        msg.messageId = -1;
      }

      if (
        msg.username.length &&
        msg.messageId != -1 &&
        // if messageId not yet in array of messages
        state.socket.messages.findIndex(
          (val) => val.data === msg.message && val.username === msg.username
        ) === -1
      ) {
        state.socket.messageId++;
        state.socket.messages.push({
          id: state.socket.messageId,
          data: msg.message,
          username: msg.username,
        });
      }
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },

    ADD_MESSAGE() {
      // if (state.socket.message.username.length) {
      //   state.socket.messageId++;
      //   state.socket.messages.push({
      //     id: state.socket.messageId,
      //     data: state.socket.message.message,
      //     username: state.socket.message.username,
      //   });
      // }
      // state.socket.messageId++;
      // state.socket.messages.push({
      //   id: state.socket.messageId,
      //   data: payload.message,
      //   username: payload.username,
      // });
    },
  },
  actions: {
    sendMessage({ commit }, payload) {
      commit('ADD_MESSAGE', payload);
    },
  },
});

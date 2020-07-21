import Vue from 'vue';

import VueNativeSock from 'vue-native-websocket';
import store from '../store';
Vue.use(VueNativeSock, 'ws://localhost:8081/ws', {
  store: store,
  connectManually: true,
});
const vm = new Vue();

var ws = {
  connect() {
    vm.$connect();
  },
  disconnect() {
    vm.$disconnect();
  },
};

export default ws;

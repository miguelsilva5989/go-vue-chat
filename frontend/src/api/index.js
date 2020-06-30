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

// let socket = null;

// var ws = {
//   connect(cb) {
//     console.log('connecting');
//     socket = new WebSocket('ws://localhost:8081/ws');

//     socket.onopen = () => {
//       console.log('Successfully Connected');
//     };

//     socket.onmessage = (msg) => {
//       console.log(msg);
//       cb(msg);
//     };

//     socket.onclose = (event) => {
//       console.log('Socket Closed Connection: ', event);
//     };

//     socket.onerror = (error) => {
//       console.log('Socket Error: ', error);
//     };
//   },
//   message(cb) {
//     socket.onmessage = (msg) => {
//       console.log(msg);
//       cb(msg);
//     };
//   },
//   disconnect() {
//     socket.close();
//     socket.onclose = (event) => {
//       console.log('Socket Closed Connection: ', event);
//     };
//     socket.onerror = (error) => {
//       console.log('Socket Error: ', error);
//     };
//   },
//   sendMsg(msg) {
//     console.log('sending msg: ', msg);
//     socket.send(msg);
//   },
// };

export default ws;

let socket = null;

var ws = {
  connect(cb) {
    console.log('connecting');
    socket = new WebSocket('ws://localhost:8081/ws');

    socket.onopen = () => {
      console.log('Successfully Connected');
    };

    socket.onmessage = (msg) => {
      console.log(msg);
      cb(msg);
    };

    socket.onclose = (event) => {
      console.log('Socket Closed Connection: ', event);
    };

    socket.onerror = (error) => {
      console.log('Socket Error: ', error);
    };
  },
  sendMsg(msg) {
    console.log('sending msg: ', msg);
    socket.send(msg);
  },
};

export default ws;

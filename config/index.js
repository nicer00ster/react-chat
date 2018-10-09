// This is the config for our MongoDB store.
const io = require('socket.io-client');

module.exports = {
  DATABASE: 'mongodb://root:Asdfasdf1@ds247699.mlab.com:47699/chicken-chat',
  connectSocket: io.connect('http://10.0.40.58:8080'),
}

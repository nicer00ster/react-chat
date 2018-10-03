const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const webpack = require('webpack');
// const WebSocket = require('ws');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/index');
const webpackConfig = require('../webpack.config');

// const wss = new WebSocket.Server({ port: 8989 });
const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';

mongoose.connect(config.DATABASE);
mongoose.Promise = global.Promise;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

const users = [];

io.on('connection', function(socket){
  console.log('User connected: ', socket.id);
  socket.join('lobby');

  socket.on('message', function(data) {
    console.log('incoming message from: ', data.sender, ' ', data.message);
    switch(data.type) {
      case 'ADD_MESSAGE':
        socket.broadcast.emit('message', data);
        break;
      default:
        break;
    }
  });

  socket.on('user', function(user) {
    console.log('added user: ', user.name);
    switch(user.type) {
      case 'ADD_USER':
        socket.broadcast.emit('user', { name: user.name, id: user.id });
        break;
      default:
        break;
    }
  })

  socket.on('disconnect', function() {
    console.log('User disconnected: ', socket.id);
  })

});


// const broadcast = (data, ws) => {
//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN && client !== ws) {
//       client.send(JSON.stringify(data));
//     }
//   });
// };
//
// const users = [];
//
// wss.on('connection', ws => {
//   let index;
//
//   ws.on('message', message => {
//     const data = JSON.parse(message);
//     console.log('aSDFASFDASDF', data);
//     switch (data.type) {
//       case 'ADD_USER': {
//         index = users.length;
//         const userArray = users.map(user => user.name);
//         if (data.name === null || userArray.indexOf(data.name) > -1) return;
//         else users.push({ name: data.name, id: data.uid });
//         ws.send(JSON.stringify({
//           type: 'ACTIVE_USERS',
//           users,
//         }));
//         broadcast({
//           type: 'ACTIVE_USERS',
//           users,
//         }, ws);
//         break;
//       }
//       case 'ADD_MESSAGE':
//         broadcast({
//           type: 'ADD_MESSAGE',
//           message: data.message,
//           sender: data.sender,
//         }, ws);
//         break;
//       default:
//         break;
//     }
//   });
//
//   ws.on('close', () => {
//     users.splice(index, 1);
//     broadcast({
//       type: 'ACTIVE_USERS',
//       users,
//     }, ws);
//   });
//
// });

if(dev) {
  const compiler = webpack(webpackConfig);
  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../frontend/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

http.listen(port, '0.0.0.0', err => {
  if(err) {
    console.error(err);
  }
  console.info('🍓🍓 Listening on http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;

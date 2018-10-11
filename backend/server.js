const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const http = require('http').Server(app);
// const server = require('https').createServer({
//   key: fs.readFileSync('backend/client.key'),
//   cert: fs.readFileSync('backend/client.crt'),
//   passphrase: 'xxxx',
// }, app);
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

let users = [];

io.on('connection', function(socket) {
  console.log('User connected: ', socket.id);
  socket.join('lobby');

  socket.on('change channel', function(data) {
    console.log('change channel server', data);
    socket.join(data.channel);
  });

  socket.on('leave channel', function(channel) {
    socket.leave(channel);
  });

  socket.on('message', function(data) {
    console.log('incoming message from: ', data.sender, ' ', data.message, ' in channel ', data.channel);
    switch(data.type) {
      case 'ADD_MESSAGE':
        socket.broadcast.emit('message', data);
        // socket.broadcast.to(data.channel).emit('message', data.message)
        break;
      default:
        break;
    }
  });

  socket.on('user', function(user) {
    console.log('added user: ', user);
    console.log('current users: ', users);
    switch(user.type) {
      case 'ADD_USER':
        user.id = socket.id;
        users.push({ type: user.type, name: user.name, id: socket.id });
        io.emit('user', { type: 'ACTIVE_USERS', users });
        break;
      case 'ACTIVE_USERS':
        console.log('firing activeusers', users);
        io.emit('user', users);
        break;
      default:
        break;
    }
  })

  // socket.on('typing', function (data) {
  //   socket.broadcast.to(data.channel).emit('typing bc', data.user);
  // });
  //
  // socket.on('stop typing', function (data) {
  //   socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
  // });

  socket.on('is typing', function(data) {
    console.log('user is typing: ', data);
    io.to('lobby').emit('is typing', data);
    // io.emit('is typing', data);
      // switch(data.type) {
      //   case 'ADD_TYPING_USER':
      //     socket.broadcast.emit('is typing', { type: 'ADD_TYPING_USER', payload: data.payload });
      //     break;
      //   case 'REMOVE_TYPING_USER':
      //     socket.broadcast.emit('is typing', { type: 'REMOVE_TYPING_USER', payload: data.payload });
      //     break;
      //   default:
      //   break;
      // }
  });

  socket.on('stopped typing', function(data) {
    console.log('user stopped typing: ', data);
    io.to('lobby').emit('stopped typing', data);
    // io.emit('stopped typing', data);
  });

  socket.on('disconnect', function() {
    console.log('User disconnected: ', socket.id);
    users = users.filter(user => user.id !== socket.id)
    io.emit('user', { type: 'ACTIVE_USERS', users });
  });

});

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
  console.info('🍓🍓 Listening on https://0.0.0.0:%s/ in your browser.', port);
});

// server.listen(8081);

module.exports = app;

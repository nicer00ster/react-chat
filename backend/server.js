const express = require('express');
const path = require('path');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const webpack = require('webpack');
const WebSocket = require('ws');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/index');
const webpackConfig = require('../webpack.config');

const wss = new WebSocket.Server({ port: 8989 });
const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';

mongoose.connect(config.DATABASE);
mongoose.Promise = global.Promise;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

const broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

const users = [];

wss.on('connection', ws => {
  let index;

  ws.on('message', message => {
    const data = JSON.parse(message);
    console.log('aSDFASFDASDF', data);
    switch (data.type) {
      case 'ADD_USER': {
        index = users.length;
        users.push({ name: data.name, id: data.uid });
        ws.send(JSON.stringify({
          type: 'ACTIVE_USERS',
          users,
        }));
        broadcast({
          type: 'ACTIVE_USERS',
          users,
        }, ws);
        break;
      }
      case 'ADD_MESSAGE':
        broadcast({
          type: 'ADD_MESSAGE',
          message: data.message,
          sender: data.sender,
        }, ws);
        break;
      default:
        break;
    }
  });

  ws.on('close', () => {
    users.splice(index, 1);
    broadcast({
      type: 'ACTIVE_USERS',
      users,
    }, ws);
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

app.listen(port, '0.0.0.0', err => {
  if(err) {
    console.error(err);
  }
  console.info('🍓🍓 Listening on http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;

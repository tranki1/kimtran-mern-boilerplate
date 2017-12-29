/* eslint-disable */
import express from 'express';
var bodyParser = require('body-parser');
var webpack = require('webpack');

var React = require('react');
var ReactDOMServer = require('react-dom/server');
import { RouterContext, match } from 'react-router';

var config = require('./webpack.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

var compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }),
);
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => res.send('Hello'));

app.get('/react', (req, res) => {
  res.send(ReactDOMServer.renderToString(<Hello />));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

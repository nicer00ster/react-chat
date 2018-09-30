import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import 'normalize.css';
import './styles/index.scss';

window.React = React;

ReactDom.render(<App />, document.querySelector('#root'));

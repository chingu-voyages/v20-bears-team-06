import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import App from './App';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

fetch('http://localhost:4000/graphql').then((res) => {
  console.log(res);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

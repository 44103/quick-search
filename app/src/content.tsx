import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

const app = document.createElement('div');
app.id = 'quick-search';
document.body.appendChild(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  app
);

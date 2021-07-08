import React from 'react';
import ReactDOM from 'react-dom';

const Main = () => {
  return <div id='container'>Hello react boilerplate</div>;
};

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);

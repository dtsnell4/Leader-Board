import React, { Component } from 'react';
import BoardComponent from './containers/board'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <BoardComponent />
      </div>
    );
  }
}

export default App;

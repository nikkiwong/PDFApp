import React, { Component } from 'react';
import './App.css';
import Upload from './components/upload/Upload'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>PDF Splitter</h1>
        <div className="Card">
          <Upload />
        </div>
      </div>
    );
  }
}

export default App;

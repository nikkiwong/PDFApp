import React, { Component } from 'react';
import './App.css';
import Upload from './components/upload/Upload'
// import GroupDragDrop from './components/groupDragDrop/GroupDragDrop'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Card">
          <Upload />
        </div>
      </div>
    );
  }
}

export default App;

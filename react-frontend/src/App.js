import React, { Component } from 'react';
import './App.css';
import Upload from './components/upload/Upload'
import GroupDragDrop from './components/groupDragDrop/GroupDragDrop'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      splitSuccessful: false,
      data: null
    }
    this.IsSplitSuccessful = this.IsSplitSuccessful.bind(this);
    }

    IsSplitSuccessful(splitSuccessful, data){
     const PDFFileNames = []
       for ( let i = 0; i<data["data"].length; i++){
         PDFFileNames.push({id: i+1, pdfName:data["data"][i],type:"PDFHolder", backgroundColor: "red"})
       }
       this.setState({ splitSuccessful: splitSuccessful, data: PDFFileNames });
   }
  render() {
    return (
      <div className="App">
        <div className="Card">
        { (this.state.splitSuccessful) ?
          <GroupDragDrop pdfData={this.state.data}/> : <Upload onSplitPDF={this.IsSplitSuccessful}/>
        }
        </div>
      </div>
    );
  }
}

export default App;

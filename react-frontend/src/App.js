import React, { Component } from 'react';
import './App.css';
import Upload from './components/upload/Upload'
import GroupDragDrop from './components/groupDragDrop/GroupDragDrop'
import DisplayResults from './components/displayResults/DisplayResults'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      splitSuccessful: false,
      groupingSuccessful: false,
      data: null,
      groupingData: []
    }
    this.isSplitSuccessful = this.isSplitSuccessful.bind(this);
    this.isGroupingSuccessful = this.isGroupingSuccessful.bind(this);
    }

    isSplitSuccessful(splitSuccessful, data){
     const PDFFileNames = []
       for ( let i = 0; i<data["data"].length; i++){
         PDFFileNames.push({id: i+1, pdfName:data["data"][i],type:"PDFHolder", backgroundColor: "red"})
       }
       this.setState({ splitSuccessful: splitSuccessful, data: PDFFileNames });
   }

   isGroupingSuccessful(groupingSuccessful, groupingData){
     this.setState({ groupingSuccessful: groupingSuccessful, groupingData:groupingData });
   }
  render() {
    return (
      <div className="App">
        { (this.state.splitSuccessful) ?
          (this.state.groupingSuccessful ? <DisplayResults results={this.state.groupingData}/> : <GroupDragDrop onGroupSuccessful={this.isGroupingSuccessful} pdfData={this.state.data}/>) : <Upload onSplitPDF={this.isSplitSuccessful}/>
        }
      </div>
    );
  }
}

export default App;

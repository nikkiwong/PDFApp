import React, { Component } from 'react';
import './GroupDragDrop.css';

class GroupDragDrop extends Component {
  constructor(props){
    super(props);
    this.state={
      pdfs: [
    	]
    }
    }

  componentDidMount(){
    this.setState({pdfs: this.props.pdfData})
  }

  onDragStart = (event, pdfName) => {
    	event.dataTransfer.setData("pdfName", pdfName);
	}
	onDragOver = (event) => {
	    event.preventDefault();
	}

	onDrop = (event, cat) => {
	    let pdfName = event.dataTransfer.getData("pdfName");

	    let pdfs = this.state.pdfs.filter((pdf) => {
	        if (pdf.pdfName === pdfName) {
	            pdf.type = cat;
	        }
	        return pdf;
	    });

	    this.setState({
	        ...this.state,
	        pdfs
	    });
	}


  saveGrouping = (e) => {
    // let groupings = this.state.pdfs.filter((pdf) => {
    //     let groups = []
    //     if (pdf.type === "Group1") {
    //         groups.push(pdf.pdfName)
    //     }
    //     return pdf;
    // });

    var requestOptions = { method: 'POST',
                     body: "Hello",
                     headers: new Headers(),
                    };

      e.preventDefault();
      fetch('http://127.0.0.1:5000/api/saveGrouping', requestOptions)
      .then( response => {
    console.log("************Response*****************");

    if(response.status.code === 404){
      console.log("Failed");
    }
    if (response.ok) {
      return response;
    }
 })
 .then((data) => {
   console.log(data)
   });
    }


  render() {
    var pdfs = {
	      PDFHolder: [],
	      Group1: [],
        Group2: [],
	    }

    this.state.pdfs.forEach ((pdf) => {
		  pdfs[pdf.type].push(
		    <div key={pdf.id}
		      onDragStart = {(event) => this.onDragStart(event, pdf.pdfName)}
		      draggable
		      className="draggable"
		      style = {{backgroundColor: pdf.bgcolor}}>
		      {pdf.pdfName}
		    </div>
		  );
		});

    return (
        // <h1>Please group your pdfs and click save</h1>
        <div className="App">
        <div className="drag-container">
          <h2 className="head">Group your PDFs</h2>
          <div className="PDFHolder"
          	onDragOver={(event)=>this.onDragOver(event)}
          	onDrop={(event)=>{this.onDrop(event, "PDFHolder")}}>
          	 {pdfs.PDFHolder}
          </div>
          <h3>Group 1</h3>
          <div className="droppable"
          	onDragOver={(event)=>this.onDragOver(event)}
        		onDrop={(event)=>this.onDrop(event, "Group1")}>
              {pdfs.Group1}
          </div>
          <h3>Group 2</h3>
          <div className="droppable"
          	onDragOver={(event)=>this.onDragOver(event)}
        		onDrop={(event)=>this.onDrop(event, "Group2")}>
              {pdfs.Group2}
          </div>
          </div>
          <input type="submit" name="Save" value="Save Grouping" onClick={(e)=> this.saveGrouping(e)}></input>
      </div>
    );
  }
}

export default GroupDragDrop;

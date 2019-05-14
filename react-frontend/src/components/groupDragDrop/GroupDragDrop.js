import React, { Component } from 'react';
import './GroupDragDrop.css';

class GroupDragDrop extends Component {
  constructor(props){
    super(props);
    this.state={
      tasks: [
    	]
    }
    }

  componentDidMount(){
    console.log("from groupdragdrop", this.props.pdfData)
    this.setState({tasks: this.props.pdfData})
  }

  onDragStart = (event, taskName) => {
    	console.log('dragstart on div: ', taskName);
    	event.dataTransfer.setData("taskName", taskName);
	}
	onDragOver = (event) => {
	    event.preventDefault();
	}

	onDrop = (event, cat) => {
	    let taskName = event.dataTransfer.getData("taskName");

	    let tasks = this.state.tasks.filter((task) => {
	        if (task.taskName === taskName) {
	            task.type = cat;
	        }
	        return task;
	    });

	    this.setState({
	        ...this.state,
	        tasks
	    });
	}


  saveGrouping = (e) => {
    const data = {
    "language" : "Python",
    "framework" : "Flask",
    "website" : "Scotch",
    "version_info" : {
        "python" : 3.4,
        "flask" : 0.12
    },
    "examples" : ["query", "form", "json"],
    "boolean_test" : true
}
      var requestOptions = { method: 'POST',
                     body: data,
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
    console.log("render")
    var tasks = {
	      inProgress: [],
	      Done: []
	    }

    this.state.tasks.forEach ((task) => {
		  tasks[task.type].push(
		    <div key={task.id}
		      onDragStart = {(event) => this.onDragStart(event, task.taskName)}
		      draggable
		      className="draggable"
		      style = {{backgroundColor: task.bgcolor}}>
		      {task.taskName}
		    </div>
		  );
		});

    return (
        // <h1>Please group your pdfs and click save</h1>
        <div className="App">
        <div className="drag-container">
          <h2 className="head">To Do List Drag & Drop</h2>
          <div className="inProgress"
          	onDragOver={(event)=>this.onDragOver(event)}
          	onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
          	 {tasks.inProgress}
          </div>
          <div className="droppable"
          	onDragOver={(event)=>this.onDragOver(event)}
        		onDrop={(event)=>this.onDrop(event, "Done")}>
              {tasks.Done}
          </div>
          </div>
          <input type="submit" name="Save" value="Save Grouping" onClick={(e)=> this.saveGrouping(e)}></input>
      </div>
    );
  }
}

export default GroupDragDrop;

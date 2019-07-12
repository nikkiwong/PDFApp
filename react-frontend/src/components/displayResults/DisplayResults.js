import React, { Component } from 'react';
// import './DisplayResults.css';

class DisplayResults extends Component {
  constructor(props){
    super(props);
    this.state={
      displayResultsData: []
    }
    }

    componentDidMount(){
      this.setState({displayResultsData: this.props.results})
    }

    render() {
      const results = this.state.displayResultsData
      let resultsHTML = ""
      for (var groupName in results){
        if(results[groupName].length>0){
          resultsHTML += groupName + ":"
          for (var pdf = 0; pdf < results[groupName].length; pdf++){
            resultsHTML += results[groupName][pdf] + "\n"
          	}
            resultsHTML += ".\n"
          }
        }
    
      return (
        <div className="App">
          <h1>Your grouping was successful</h1>
          Here is a summary of your groupings:
          <p>
          {resultsHTML}
          </p>
        </div>
      );
    }
  }

  export default DisplayResults;

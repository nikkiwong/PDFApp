import React, { Component } from 'react';

class Split extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: ''
    }
  }

  splitPDF(e) {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/api/split')
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <input type="submit" name="split" value="Split PDF" onClick={(e) => this.splitPDF(e)}></input>
      </div>
    );
  }
}

export default Split;

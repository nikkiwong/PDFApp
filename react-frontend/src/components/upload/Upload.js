
import React, { Component } from 'react';
import { post } from 'axios';
import Split from '../split/Split'
class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: ''
    }
  }

  onChange(e) {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      const url = "http://127.0.0.1:5000/api/upload";
      const formData = { file: e.target.result }
      return post(url, formData).then(response => console.log("result", response))
    }
  }

  splitPDF(e) {
    var headers = new Headers();
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS');
    var requestOptions = {
      method: 'GET',
      headers: headers,
      cache: 'default',
    };

    e.preventDefault();
    fetch('http://127.0.0.1:5000/api/split', requestOptions)
      .then(response => response.json())
      .then((data) => {
        this.setState({ file: data })
        this.props.onSplitPDF(true, data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Upload your pdf</h1>
        <input type="file" name="file" onChange={(e) => this.onChange(e)}></input>
        <div>
          <input type="submit" name="split" value="Split PDF" onClick={(e) => this.splitPDF(e)}></input>
        </div>
      </div>
    );
  }
}

export default Upload;

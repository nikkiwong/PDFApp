
import React, { Component } from 'react';
import {post} from 'axios';
import Split from '../split/Split'
class Upload extends Component {

  constructor(props){
    super(props);
    this.state={
      file:''
    }
  }

  onChange(e){
    let files=e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload=(e)=>{
      const url="http://127.0.0.1:5000/api/upload";
      const formData={file:e.target.result}
      return post(url, formData).then(response=> console.log("result", response))
    }
  }

  splitPDF(e){
    var headers = new Headers();
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5000');
    headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS');
    var requestOptions = { method: 'GET',
                   headers: headers,
                   mode: 'cors',
                   cache: 'default',
                  };

    e.preventDefault();
    fetch('http://127.0.0.1:5000/api/split', requestOptions)
    .then(function(response) {
      console.log(response)
    })
    // .then(function(myBlob) {
    //   var objectURL = URL.createObjectURL(myBlob);
    //   image.src = objectURL;
    // })
    .catch((error)=>{
      console.log(error)
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Upload your pdf</h1>
        <input type="file" name="file" onChange={(e)=>this.onChange(e)}></input>
        <div>
          <input type="submit" name="split" value="Split PDF" onClick={(e)=> this.splitPDF(e)}></input>
        </div>
      </div>
    );
  }
}

export default Upload;



// import React, { Component } from "react";
// import Dropzone from "../dropzone/Dropzone";
// import "./Upload.css";
// import Progress from "../progress/Progress";

// class Upload extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       files: [],
//       uploading: false,
//       uploadProgress: {},
//       successfullUploaded: false
//     };

//     this.onFilesAdded = this.onFilesAdded.bind(this);
//     this.uploadFiles = this.uploadFiles.bind(this);
//     this.sendRequest = this.sendRequest.bind(this);
//     this.renderActions = this.renderActions.bind(this);
//   }

//   onFilesAdded(files) {
//     this.setState(prevState => ({
//       files: prevState.files.concat(files)
//     }));
//   }

//   async uploadFiles() {
//     this.setState({ uploadProgress: {}, uploading: true });
//     const promises = [];
//     this.state.files.forEach(file => {
//       promises.push(this.sendRequest(file));
//     });
//     try {
//       await Promise.all(promises);

//       this.setState({ successfullUploaded: true, uploading: false });
//     } catch (e) {
//       // Not Production ready! Do some error handling here instead...
//       this.setState({ successfullUploaded: true, uploading: false });
//     }
//   }

//   sendRequest(file) {
//     return new Promise((resolve, reject) => {
//       const req = new XMLHttpRequest();

//       req.upload.addEventListener("progress", event => {
//         if (event.lengthComputable) {
//           const copy = { ...this.state.uploadProgress };
//           copy[file.name] = {
//             state: "pending",
//             percentage: (event.loaded / event.total) * 100
//           };
//           this.setState({ uploadProgress: copy });
//         }
//       });

//       req.upload.addEventListener("load", event => {
//         const copy = { ...this.state.uploadProgress };
//         copy[file.name] = { state: "done", percentage: 100 };
//         this.setState({ uploadProgress: copy });
//         resolve(req.response);
//       });

//       req.upload.addEventListener("error", event => {
//         const copy = { ...this.state.uploadProgress };
//         copy[file.name] = { state: "error", percentage: 0 };
//         this.setState({ uploadProgress: copy });
//         reject(req.response);
//       });

//       const formData = new FormData();
//       formData.append("file", file, file.name);

//       req.open("POST", "http://127.0.0.1:5000/upload");
//       req.send(formData);
//     });
//   }

//   renderProgress(file) {
//     const uploadProgress = this.state.uploadProgress[file.name];
//     if (this.state.uploading || this.state.successfullUploaded) {
//       return (
//         <div className="ProgressWrapper">
//           <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
//           <img
//             className="CheckIcon"
//             alt="done"
//             src="baseline-check_circle_outline-24px.svg"
//             style={{
//               opacity:
//                 uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
//             }}
//           />
//         </div>
//       );
//     }
//   }

//   renderActions() {
//     if (this.state.successfullUploaded) {
//       return (
//         <button
//           onClick={() =>
//             this.setState({ files: [], successfullUploaded: false })
//           }
//         >
//           Clear
//         </button>
//       );
//     } else {
//       return (
//         <button
//           disabled={this.state.files.length < 0 || this.state.uploading}
//           onClick={this.uploadFiles}
//         >
//           Upload
//         </button>
//       );
//     }
//   }

//   render() {
//     return (
//       <div className="Upload">
//         <span className="Title">Upload Files</span>
//         <div className="Content">
//           <div>
//             <Dropzone
//               onFilesAdded={this.onFilesAdded}
//               disabled={this.state.uploading || this.state.successfullUploaded}
//             />
//           </div>
//           <div className="Files">
//             {this.state.files.map(file => {
//               return (
//                 <div key={file.name} className="Row">
//                   <span className="Filename">{file.name}</span>
//                   {this.renderProgress(file)}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div className="Actions">{this.renderActions()}</div>
//       </div>
//     );
//   }
// }

// export default Upload;

import React, { useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';


const App = () => {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');
  const [invoice,setInvoice ] = useState('');
  useEffect(() => {
    getData();
  }, [status]);
  const handleInvoice = async()=>{
    try{
      const response = await axios.get('http://127.0.0.1:8000/get_invoice/');
      console.log("invoice response",response)
      setInvoice(response.data);
    }
    catch(error){

    }
  }
  const getData =async() =>{
    try {
      const response = await axios.get('http://127.0.0.1:8000/get_files/');
      console.log("data",response)
      setFiles(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const handleFileChange = async(event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', selectedFile)
    formData.append("name",selectedFile.name)
    formData.append("status","success")
    try {
      const response= await axios.post('http://127.0.0.1:8000/upload/',formData,{
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "multipart/form-data",
          Accept: "application/json, text/plain, */*",
        }, 
      })
      console.log(response.data);
    }
    catch (error){
      console.error(error);
    }
    
      
    const newFile = {
      name: selectedFile.name,
      status: 'Uploading',
    };
    setFiles([...files, newFile]);

    // Simulating file upload process
    setTimeout(() => {
      const updatedFiles = files.map((file) => {
        if (file.name === newFile.name) {
          return { ...file, status: 'Uploaded' };
        }
        return file;
      });
      setFiles(updatedFiles);
      setStatus("success")
    }, 2000);
  };

  return (
    <div className="container">
      <h1 className="title">Document Digitalization App</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <table className="file-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.name}</td>
              <td>{file.status}</td>
              <td><button onClick={handleInvoice}>invoice</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="file-table">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>values</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(invoice).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
        </tbody>
      </table>

    </div>
  );
};

export default App;

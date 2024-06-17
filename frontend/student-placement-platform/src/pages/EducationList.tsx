import React from 'react';
import { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios';
import  EducationHistory from './AddEducationHistory'

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';


import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Row } from 'react-bootstrap';


 
  const columns2 = [
    {
      dataField: "educationid",
      text: "Education ID",
      sort: true,
      hidden: true
    },
    {
      dataField: "institutionName",
      text: "Institution Name",
      sort: true
     
    },
    {
        dataField: "degree",
        text: "Degree",
        sort: true
    },
    {
        dataField: "major",
        text: "Major",
        sort: true
    },
    {
      dataField: "startDate",
      text: "Start Date",
      sort: true
  },
  {
    dataField: "endDate",
    text: "End Date",
    sort: true
},
{
  dataField: "remove",
  text: "",
  formatter: (cellContent, row) => {
    return (<div>
    <FontAwesomeIcon icon={faEdit}  />
    <FontAwesomeIcon icon={faTrash} />
   
      <Button variant="primary" size="sm">
    <FontAwesomeIcon icon={faEdit} />
</Button>
      <Button size="sm">
    <FontAwesomeIcon icon={faTrash} />
</Button>
     </div>
    
    );
  },
},
    
  ];

  const onDeleteClicked = async (educationid,id) => {
    console.log(educationid,id);
        const response = await axios.delete('http://localhost:8089/api/v1/users/'+id+'/education-history/'+educationid+'');
        console.log(id); 
          
  
         
        };
 

function EducationHistoryList(){
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();
  const [educationHistory, setEducationHistory] = useState([]);
  const [educationid, setEducationid] = useState('');
  const [userid, setUserId] = useState('');
  const [degree, setDegree] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [major, setMajor] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState('');
  
  const [show, setShow] = useState([false]);
  const handleClose = () => setShowModal(false);
  const handleShow= () => setShowModal(true);
  const columns = [
    {
      dataField: "educationid",
      text: "Education ID",
      sort: true,
      hidden: true
    },
    {
      dataField: "institutionName",
      text: "Institution Name",
      sort: true
     
    },
    {
        dataField: "degree",
        text: "Degree",
        sort: true
    },
    {
        dataField: "major",
        text: "Major",
        sort: true
    },
    {
      dataField: "startDate",
      text: "Start Date",
      sort: true
  },
  {
    dataField: "endDate",
    text: "End Date",
    sort: true
},
{
  dataField: "remove",
  text: "",

  formatter: (cellContent, row) => {
    return (
       <div className="col-sm-6">
   
                          
   
      <Button  onClick={() => onDeleteClicked(row)} variant="primary" size="sm">
    <FontAwesomeIcon icon={faTrash} />
</Button>
      <Button  onClick={() => editRow(row)} size="sm">
    <FontAwesomeIcon icon={faEdit} />
</Button>
     </div>
    
    );
  },
},
    
  ];


  const onDeleteClicked = async (row) => {
    setEducationid(row.educationId);
        const response = await axios.delete('http://localhost:8089/api/v1/users/'+id+'/education-history/'+educationid+'');
           
          
  
         
        };
  
        const editRow = async ( row) => {
          console.log(row);
          setEducationid(row.educationId);
          
            console.log(row);
            handleShow();
            
            setInstitutionName(row.institutionName);
            setMajor(row.major);
            setDegree(row.degree);
            setStartDate(row.startDate);
            setEndDate(row.endDate);
          
                
        
               
              };      

              const AddRow = async () => {
                console.log("adding new record");
                setEducationid("");
                
                  
                  handleShow();
                  
                  setInstitutionName("");
                  setMajor("");
                  setDegree("");
                  setStartDate("");
                  setEndDate("");
                
                      
              
                     
                    };    


const onSubmitClicked = async () => {
  try {
    
      const response = await axios.put('http://localhost:8089/api/v1/users/'+id+'/education-history/'+educationid+'', {
         
        
         
        institutionName: institutionName,
        degree: degree,
        major: major,
        startDate : startDate,
        endDate : endDate
      });

      if (response.status === 201 || response.status === 200) {
        window.location.reload();
          setSuccessMessage('Registration successful! Redirecting to login...');
          setErrorMessage('');
          
      }
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error("Axios error during registration:", error.response?.data || "No additional error info available");
          setErrorMessage(error.response?.data || "No additional error info available");
      } else if (error instanceof Error) {
          console.error("Error during registration:", error.message);
          setErrorMessage(error.message);
      } else {
          console.error("Unexpected error type during registration:", error);
          setErrorMessage("An unexpected error occurred.");
      }
  }
  handleClose();
  
};
const onAddClicked = async () => {
  try {
    
      const response = await axios.post('http://localhost:8089/api/v1/users/'+id+'/education-history/', {
         
        
         
        institutionName: institutionName,
        degree: degree,
        major: major,
        startDate : startDate,
        endDate : endDate
      });

      if (response.status === 201 || response.status === 200) {
        window.location.reload();
          setSuccessMessage('Registration successful! Redirecting to login...');
          setErrorMessage('');
          
      }
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.error("Axios error during registration:", error.response?.data || "No additional error info available");
          setErrorMessage(error.response?.data || "No additional error info available");
      } else if (error instanceof Error) {
          console.error("Error during registration:", error.message);
          setErrorMessage(error.message);
      } else {
          console.error("Unexpected error type during registration:", error);
          setErrorMessage("An unexpected error occurred.");
      }
  }
  handleClose();
  
};
 const toggleTrueFalse =() =>{
  setShow([true]);
 }

  const handleCellEdit = (rowId, field, value) => {
    // Update the data array with the edited value
    const updatedData = educationHistory.map((row) =>
      row.id === rowId ? { ...row, [field]: value } : row
    );
    setEducationHistory(updatedData);
  };
  const [rows, initRow] = useState([]);

  
  useEffect(() => {
    const getEducationalHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8089/api/v1/users/'+id+'/education-history');
        setEducationHistory(response.data);
       
      } catch (error) {
        console.log(error);
      }
    };
    getEducationalHistory();
  }, []);
  
    
    return ( 
 
        <div className="App">
       
                  
       <button type="button" className="btn btn-primary mb-3" onClick={AddRow}>
                       Add new Education History
                    </button>
             

      <BootstrapTable
        bootstrap4
        keyField="educationid"
        striped
        data={educationHistory}
        columns={columns}
      
   
      />
   
    <div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Education</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      
            <div>
               
            
                <form className="needs-validation" noValidate>
                   
                    <input type="text" className="form-control mb-3" placeholder="Institution Name" value={institutionName} onChange={e => setInstitutionName(e.target.value)} required />
                    <input type="text" className="form-control mb-3" placeholder="Major" value={major} onChange={e => setMajor(e.target.value)} required />
                    
                    <input type="email" className="form-control mb-3" placeholder="Degree" value={degree} onChange={e => setDegree(e.target.value)} required />
                    <input type="date" className="form-control mb-3" placeholder="Start Date"  onChange={e => setStartDate(e.target.value)} required />
                    <input type="date" className="form-control mb-3" placeholder="End Date"  onChange={e => setEndDate(e.target.value)} required />
                    </form>
                    </div>  </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
       
        <button type="button" className="btn btn-primary mb-3" onClick={educationid==""?onAddClicked:onSubmitClicked}>
                       Submit
                    </button>
      </Modal.Footer>
    </Modal>
  </div> </div>
    
    );
    }
    export default  EducationHistoryList;

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
  const [dspstartDate, setdspStartDate] = useState('');
  const [dspEndDate, setdspEndDate] = useState('');
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
      sort: true,
      type:"Date"
      
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
    console.log(row.educationId);
        const response = await axios.delete('http://63.34.12.64:8089/api/v1/users/'+id+'/education-history/'+row.educationid+'');
           
          
  
         
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
            setpickerdate(row.startDate,"StartDate");
            
            setEndDate(row.endDate);
            setpickerdate(row.endDate,"EndDate");
                
        
               
              };      

              const AddRow = async () => {
                console.log("adding new record");
                setEducationid(null);
                
                  
                  handleShow();
                  
                  setInstitutionName("");
                  setMajor("");
                  setDegree("");
                  setStartDate("");
                  setEndDate("");
                
                      
              
                     
                    };    


const onSubmitClicked = async () => {
  
  try {
  
    const response = await axios.put('http://63.34.12.64:8089/api/v1/users/'+id+'/education-history/'+educationid+'', {
         
        
  userId:id, 
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
    
      const response = await axios.post('http://63.34.12.64:8089/api/v1/users/'+id+'/education-history', {
         
        
        userId:id, 
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
        const response = await axios.get('http://63.34.12.64:8089/api/v1/users/'+id+'/education-history');
        setEducationHistory(response.data);
       
      } catch (error) {
        console.log(error);
      }
    };
    getEducationalHistory();
  }, []);


  const setdate= async (newDate, fieldName) => {
    console.error("Error during registration3:" , newDate);
  const date = new Date(newDate);
  /* Date format you have */
  
  const dateMDY = "`"+date.getDate()+"-"+date.getMonth() +"-"+date.getFullYear()+"'";
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
const dateMDY2= `${year}-${month}-${day}`;
console.error("Error during registration:" , dateMDY2);
if (fieldName =="StartDate"){
  setStartDate(dateMDY2);}
  else {setEndDate(dateMDY2);}
  setpickerdate(newDate,fieldName);
 
}
const formatdate= async (newDate) => {
  console.error("Error during registration3:" , newDate);
const date = new Date(newDate);
/* Date format you have */


const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
const dateMDY= `${year}-${month}-${day}`;
console.error("Error during registration:" , dateMDY);

return dateMDY;

}
const setpickerdate= async (newDate,fieldName) => {
   
  const date = new Date(newDate);
  /* Date format you have */
  
  
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
const dateMDY= `${year}-${month}-${day}`;
console.error("Error during registration2:" , dateMDY);
if (fieldName =="StartDate"){
  setdspStartDate(dateMDY)}
  else {setdspEndDate(dateMDY);}

 
}
  /* Date converted to MM-DD-YYYY format */
    return ( 
 
        <div className="App">
       <div className="col-sm-4"> 
                  
       <button type="button" className="btn btn-primary mb-3" onClick={AddRow}>
                       Add Education History
                    </button>
             </div>

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
        <Modal.Title>Education History</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      
            <div>
               
            
                <form className="needs-validation" noValidate>
                   
                    <input type="text" className="form-control mb-3" placeholder="Institution Name" value={institutionName} onChange={e => setInstitutionName(e.target.value)} required />
                    <input type="text" className="form-control mb-3" placeholder="Major" value={major} onChange={e => setMajor(e.target.value)} required />
                    
                    <input type="email" className="form-control mb-3" placeholder="Degree" value={degree} onChange={e => setDegree(e.target.value)} required />
                    <input type="date"  className="form-control mb-3" placeholder="Start Date" value= {dspstartDate} onChange={e => setdate(e.target.value,"StartDate")} required />
                    <input type="date" className="form-control mb-3" placeholder="End Date" value= {dspEndDate} onChange={e => setdate(e.target.value,"EndDate")} required />
                    </form>
                    </div>  </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
       
        <button type="button" className="btn btn-primary mb-3"
        disabled={!institutionName || !major ||!degree || !dspstartDate || !dspEndDate}
        onClick={educationid==null?onAddClicked:onSubmitClicked}>
                       Submit
                    </button>
      </Modal.Footer>
    </Modal>
  </div> </div>
    
    );
    }
    export default  EducationHistoryList;

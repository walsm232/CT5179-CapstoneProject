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


 
  

  const onDeleteClicked = async (educationid,id) => {
    console.log(educationid,id);
        const response = await axios.delete('http://localhost:8089/api/v1/users/'+id+'/education-history/'+educationid+'');
        console.log(id); 
          
  
         
        };
 

function SkillList(){
  const [errorMessage, setErrorMessage] = useState('');
  const [editUrl, setUrl ]= useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();
  const [skills, setSkills] = useState([]);
  const [educationHistory, setEducationHistory] = useState([]);
  const [educationid, setEducationid] = useState('');
  const [skillid, setSkillid] = useState('');
  const [skillName, setSkillName] = useState('');
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
      dataField: "skillId",
      text: "Skill ID",
      sort: true,
      hidden: true
    },
    {
      dataField: "skillName",
      text: "",
      sort: true,
      editable: true,
    },
    
{
  dataField: "remove",
  text: "",
  editable: false,

  formatter: (cellContent, row, rowIndex) => {
    return (
      <div className="col-sm-2">
   
                          
   
      <Button  onClick={() => onDeleteClicked(row)} variant="primary" size="sm">
    <FontAwesomeIcon icon={faTrash} />
</Button>
      
     </div>
    
    );
  },
},

    
  ];

  const AddClicked = async (row) => {
    setSkillid(row.skillId);
        const response = await axios.delete('http://localhost:8089/api/v1/users/'+id+'/skills/'+row.skillId+'');
           
          
  
         
        };

  const onDeleteClicked = async (row) => {
    setSkillid(row.skillId);
    console.log(row.skillId);  
        
        try {
          const response = await axios.delete('http://localhost:8089/api/v1/users/'+id+'/skills/'+row.skillId+'');
          
          
            if (response.status === 201 || response.status === 200) {
              window.location.reload();
                setSuccessMessage('Delete complete..');
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
          
        window.location.reload();   
         
        };
  
      
             



const onAddSkill = async () => {
  const response = await axios.post('http://localhost:8089/api/v1/users/'+id+'/skills', {
    skillName: skillName,
   
 });
 window.location.reload(); 

}

const onSubmitClicked = async (oldvalue,newvalue,row, columnn) => {
  let skillid;
  if (row.skillId==null){
    skillid ="";
    
  }else
  {skillid =row.skillId}
  console.log(skillid);
  try {
    let response;
    if (row.skillId==100101){
       response = await axios.post('http://localhost:8089/api/v1/users/'+id+'/skills', {
         skillName: newvalue,
        
      });
    }
    else{
       response = await axios.put('http://localhost:8089/api/v1/users/'+id+'/skills/'+row.skillId+'', {
        skillName: newvalue,
       
     });
    }
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
  window.location.reload();
  
};




  const handleCellEdit = (rowId, field, value) => {
    // Update the data array with the edited value
    const updatedData = skills.map((row) =>
      row.id === rowId ? { ...row, [field]: value } : row
    );
    setSkills(updatedData);
  };
  const [rows, initRow] = useState([]);

  
  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await axios.get('http://localhost:8089/api/v1/users/'+id+'/skills');
        setSkills(response.data);
       
      } catch (error) {
        console.log(error);
      }
    };
    getSkills();
  }, []);
  
    
    return ( 
 
        <div className="App">
      
       <div className="col-sm-6">    
       
<input type="text" className="form-control mb-3" placeholder="Please enter skill name"  onChange={e => setSkillName(e.target.value)} required />
<Button  onClick={onAddSkill} variant="primary" size="sm">
       Add Skill
</Button>
</div>
             

      <BootstrapTable
        bootstrap4
        keyField="skillId"
        striped
        data={skills}
        columns={columns}
     data-show-refresh="true"
        cellEdit={ cellEditFactory({ mode: 'click',blurToSave: true,afterSaveCell: onSubmitClicked, }) }
   
      />
   
    
    
  </div> 
    
    );
    }
    export default  SkillList;

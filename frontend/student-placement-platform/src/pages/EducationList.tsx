import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import axios from 'axios';


import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';


import BootstrapTable from 'react-bootstrap-table-next';



const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${rowIndex}`);
    },
    onMouseEnter: (e, row, rowIndex) => {
      console.log(`enter on row with index: ${rowIndex}`);
    }
 }
  const columns = [
    {
      dataField: "educationid",
      text: "Education ID",
      sort: true
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
   
    
  ];


function EducationHistoryList(){
  const { id } = useParams();
  const [educationHistory, setEducationHistory] = useState([]);
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
         
      <BootstrapTable
        bootstrap4
        keyField="educationid"
        striped
        data={educationHistory}
        columns={columns}
        rowEvents={ tableRowEvents }
   
      />
    </div>
      );
    }
    export default  EducationHistoryList;

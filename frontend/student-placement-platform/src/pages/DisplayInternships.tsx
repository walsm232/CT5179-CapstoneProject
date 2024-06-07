import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';

const DisplayInternships = () => {
    const url = 'http://localhost:8089/api/v1/internships'
  
    const [data, setData] = useState([])
  
    useEffect(() => {
      axios.get(url).then(json => setData(json.data))
    }, [])
  

    const tableRowEvents = {
        onClick: (e, row, rowIndex) => {
          console.log(`clicked on row with index: ${rowIndex}`);
          window.open("studentprofile/"+ rowIndex);
        },
        onMouseEnter: (e, row, rowIndex) => {
          console.log(`enter on row with index: ${rowIndex}`);
        }
     }

    const columns = [
        {
          dataField: "id",
          text: "Internship ID",
          sort: true
        },
        {
          dataField: "jobTitle",
          text: "Job Title",
          sort: true
        },
        {
            dataField: "location",
            text: "Location",
            sort: true
        },
        {
            dataField: "duration",
            text: "Duration",
            sort: true
        },
        {
            dataField: "deadline",
            text: "Deadline",
            sort: true
        }
        
      ];

    return (
      <div>
        <h1 id="title">Internships</h1>
        <BootstrapTable
        bootstrap4
        keyField="id"
        striped
        data={data}
        columns={columns}
        rowEvents={ tableRowEvents }
      />
      </div>
    )
  }
  export default DisplayInternships;
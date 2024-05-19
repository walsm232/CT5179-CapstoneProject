import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import StudentData from "../StudentData.json";


import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

import BootstrapTable from 'react-bootstrap-table-next';

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
      text: "Student ID",
      sort: true
    },
    {
      dataField: "name.first",
      text: "First Name",
      sort: true
    },
    {
        dataField: "name.last",
        text: "Last Name",
        sort: true
    },
    {
        dataField: "gender",
        text: "Gender",
        sort: true
    },
    {
        dataField: "email[0]",
        text: "Email",
        sort: true
    }
    
  ];


function StudentList(){

   
    
    return (
        <div className="App">
      <BootstrapTable
        bootstrap4
        keyField="id"
        striped
        data={StudentData}
        columns={columns}
        rowEvents={ tableRowEvents }
        pagination={paginationFactory()}
      />
    </div>
      );
    }
    export default StudentList;

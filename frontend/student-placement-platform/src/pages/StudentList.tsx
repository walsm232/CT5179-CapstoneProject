import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import StudentData from "../StudentData.json";

import axios from 'axios';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

import BootstrapTable from 'react-bootstrap-table-next';

const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${rowIndex}`);
      window.open("profile/"+ row.id);
    },
    onMouseEnter: (e, row, rowIndex) => {
      console.log(`enter on row with index: ${rowIndex}`);
    }
 }
  const columns = [
    {
      dataField: "id",
      text: "Student ID",
      sort: true,
      hidden: true
    },
    {
      dataField: "firstName",
      text: "First Name",
      sort: true
    },
    {
        dataField: "lastName",
        text: "Last Name",
        sort: true
    },
    {
        dataField: "userName",
        text: "User Name",
        sort: true
    },
    {
      dataField: "email",
      text: "Email",
      sort: true
  }
    
  ];


function StudentList(){

  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    const getStudentList = async () => {
      try {
        const response = await axios.get('http://localhost:8089/api/v1/users');
        setStudentList(response.data);
       
      } catch (error) {
        console.log(error);
      }
    };
    getStudentList();
  }, []);
    
    return (
        <div className="App">
      <BootstrapTable
        bootstrap4
        keyField="id"
        striped
        data={studentList}
        columns={columns}
        rowEvents={ tableRowEvents }
        pagination={paginationFactory()}
      />
    </div>
      );
    }
    export default StudentList;

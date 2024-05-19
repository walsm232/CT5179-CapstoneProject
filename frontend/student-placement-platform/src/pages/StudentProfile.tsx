import React from 'react';
import { useState, useEffect } from 'react';

import {useNavigate, useParams} from 'react-router-dom';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import axios from 'axios';
import  EducationList from './EducationList'



function Student({name, username,email} :{name:string, username:string,email:string }){
return(
    <form>
        <h1>Student Profile</h1>
    <div className="form-group row">
    
    <div className="col-sm-10">
    <label htmlFor="name">Last Name</label>
    <input type="text" className="form-control" id="email"value={username}/>
    <label htmlFor="Name">First Name</label>
    <input type="text" className="form-control" id="email"value={name}/>
    
    <label htmlFor="phone">Email</label>
    <input type="text" className="form-control" id="email"value={email}/>
   </div>

    </div>
    </form>
    );
}

function StudentProfile(){
    const [data,setData]= useState(null);
    const { id } = useParams();
    useEffect(()=>{
        fetch(
            'http://localhost:8089/api/v1/users/'+id
        )
        .then((response)=>response.json())
        .then(setData);
    },[]);
    if(data)
        return (
            <React.Fragment>       
    <Student
     name={data?.firstName}
     username={data?.lastName}
     email={data?.email}
      />
       
        <div>
        <EducationList/>
      </div></React.Fragment>);

    }
    export default StudentProfile;


   
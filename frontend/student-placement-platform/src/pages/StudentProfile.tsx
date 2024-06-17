import React from 'react';
import { useState, useEffect } from 'react';

import {useNavigate, useParams} from 'react-router-dom';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import  EducationList from './EducationList'
import  SkillList from './SkillList'
import cellEditFactory from 'react-bootstrap-table2-editor';



function Student({name,lastname, username,email} :{name:string, lastname:string, username:string,email:string }){
return(
    <form>
        <h1>Student Profile- {name} {lastname} </h1>
    <div className="form-group row">
    
    <div className="col-sm-10">
    <label htmlFor="name">Last Name</label>
    <input type="text" className="form-control" id="lastname"defaultValue={lastname}/>
    <label htmlFor="Name">First Name</label>
    <input type="text" className="form-control" id="firstname"defaultValue={name}/>
    <label htmlFor="name">User Name</label>
    <input type="text" className="form-control" id="lastname"defaultValue={username}/>
    
    <label htmlFor="phone">Email</label>
    <input type="text" className="form-control" id="email"defaultValue={email} />
   </div>

    </div>
    </form>
    );
}

function StudentProfile(){
    const [data,setData]= useState(null);
    const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
    const { id } = useParams();
    const onSubmitClicked = async (a) => {
        console.log(data?.email);
        try {
            const response = await axios.put('http://localhost:8089/api/v1/users/'+id+'', {
               
                
                email: email,
                username: username


                
            });
      
            if (response.status === 201 || response.status === 200) {
              window.location.reload();
               
                
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error during registration:", error.response?.data || "No additional error info available");
               
            } else if (error instanceof Error) {
                console.error("Error during registration:", error.message);
               
            } else {
                console.error("Unexpected error type during registration:", error);
               
            }
        }
      
        
      };
    
    useEffect(()=>{
        fetch(
            'http://localhost:8089/api/v1/users/'+id
        )
        .then((response)=>response.json())
        .then(setData)
      
     
    },[]);
  
    if(data)
   
        return (
         
            <React.Fragment>       
              <section className="container">   
     <form>
        <h2>Student Profile {data?.name} {data?.lastname} </h2>
    <div className="form-group row">
    
    <div className="col-sm-10">
    <label htmlFor="name">Last Name</label>
    <input type="text" className="form-control" id="lastname"defaultValue={data?.lastName}/>
    <label htmlFor="Name">First Name</label>
    <input type="text" className="form-control" id="firstname"defaultValue={data?.firstName}/>
    <label htmlFor="name">User Name</label>
    <input type="text" className="form-control" id="username"defaultValue={username} onChange={e => setUserName(e.target.value)}/>
    
    <label htmlFor="email">Email</label>
    <input type="text" className="form-control" id="email" defaultValue={email} onChange={e => setEmail(e.target.value)}/>
    </div>
    
    </div>
    <div className="col-sm-3">
    <button type="submit" className="btn btn-primary btn-sm"  onClick={onSubmitClicked}>
                       Update
                    </button>
                    </div>

   
    
    
        
                    </form>
           
            <div>
        <h3>Education History </h3>
        <EducationList/>
        <SkillList/>
      </div></section></React.Fragment>);

    }
    export default StudentProfile;


   
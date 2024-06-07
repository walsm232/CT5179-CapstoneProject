import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import StudentProfile from './pages/StudentProfile'
import  AddEducationHistory from './pages/AddEducationHistory'
import  EducationList from './pages/EducationList'

import StudentList from './pages/StudentList'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'
import CreateInternship from './pages/InternshipCreation'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="login" element={<Login />} />  
                <Route path="register" element={<Register />}/> 
                <Route path="studentprofile/:id" element={<StudentProfile />}/> 
                <Route path="studentlist" element={<StudentList />}/>
                <Route path="addeducationhistory" element={<AddEducationHistory />}/> 
                <Route path="educationlist/:id" element={<EducationList />}/> 
                <Route path="internshipcreation" element={<CreateInternship />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<Homepage />} />
            </Routes>
        </Router>
    )
}

export default RootComponent

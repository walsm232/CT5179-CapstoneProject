import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import InternshipDetail from './pages/InternshipDetail'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import StudentProfile from './pages/StudentProfile'
import AddEducationHistory from './pages/AddEducationHistory'
import EducationList from './pages/EducationList'
import Account from './pages/Account'
import StudentList from './pages/StudentList'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="login" element={<Login />} />  
                <Route path="register" element={<Register />} /> 
                <Route path="profile/:id" element={<StudentProfile />} /> 
                <Route path="studentlist" element={<StudentList />} />
                <Route path="addeducationhistory" element={<AddEducationHistory />} /> 
                <Route path="educationlist/:id" element={<EducationList />} /> 
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="account" element={<Account />} />
                <Route path="internship/:id" element={<InternshipDetail />} />
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default RootComponent;
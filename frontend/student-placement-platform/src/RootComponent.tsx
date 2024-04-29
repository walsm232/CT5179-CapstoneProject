import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="login" element={<Login />} />  
                <Route path="register" element={<Register />}/> 
                <Route path={ROUTES.HOMEPAGE_ROUTE} element={<Homepage />} />
            </Routes>
        </Router>
    )
}

export default RootComponent

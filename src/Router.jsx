import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Dashboard from './views/Dashboard'
import HomePage from './views/HomePage'
import Registration from './views/Registration'
import RingSizeGuide from './views/RingSizeGuide'
import LoginView from './views/LoginView'
import UserDashboard from './views/UserDashboard'





const Router = () => {
    return (
        <BrowserRouter>
            
            <main>
                
                <Routes>
                    {/*<Route exact path="/" element={<HomePageViews></HomePageViews>} />*/}
                    
                    <Route exact path="/dashboard" element={<Dashboard></Dashboard>} />
                    <Route exact path="/" element={<HomePage></HomePage>} />
                    
                    <Route exact path="/login" element={<LoginView></LoginView>} />
                    <Route exact path="/register" element={<Registration></Registration>} />
                    <Route exact path="/info" element={<RingSizeGuide></RingSizeGuide>} />
                    <Route exact path="/userdashboard" element={<UserDashboard></UserDashboard>} />




                    



                </Routes>
            </main>

            <Toaster position="top-right" richColors />
        </BrowserRouter>
    )
}

export default Router
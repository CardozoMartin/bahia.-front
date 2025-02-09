import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import Dashboard from './views/Dashboard'
import HomePage from './views/HomePage'
import Registration from './views/Registration'
import RingSizeGuide from './views/RingSizeGuide'
import LoginView from './views/LoginView'
import UserDashboard from './views/UserDashboard'
import ProductsAll from './views/ProductsAll'
import { useSession } from './store/useSession'

const Router = () => {
    const { user } = useSession()

    return (
        <BrowserRouter>
            <main>
                <Routes>
                    {/* Redirect logged-in users away from login and registration pages */}
                    <Route
                        exact
                        path="/login"
                        element={user ? <Navigate to="/userdashboard" /> : <LoginView />}
                    />
                    <Route
                        exact
                        path="/register"
                        element={user ? <Navigate to="/userdashboard" /> : <Registration />}
                    />
                    
                    {/* Redirect users without admin rights to the homepage */}
                    <Route
                        exact
                        path="/dashboard"
                        element={user && user.isAdmin ? <Dashboard /> : <Navigate to="/" />}
                    />
                    
                    {/* Only logged-in users can access UserDashboard */}
                    <Route
                        exact
                        path="/userdashboard"
                        element={user ? <UserDashboard /> : <Navigate to="/" />}
                    />

                    {/* Other routes */}
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/info" element={<RingSizeGuide />} />
                    <Route exact path="/productall" element={<ProductsAll />} />
                </Routes>
            </main>

            <Toaster position="top-right" richColors />
        </BrowserRouter>
    )
}

export default Router

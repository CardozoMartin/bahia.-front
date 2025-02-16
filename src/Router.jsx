import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Dashboard from './views/Dashboard';
import HomePage from './views/HomePage';
import Registration from './views/Registration';
import RingSizeGuide from './views/RingSizeGuide';
import LoginView from './views/LoginView';
import UserDashboard from './views/UserDashboard';
import ProductsAll from './views/ProductsAll';
import { useSession } from './store/useSession';
import ProductDetail from './views/ProductDetail';
import UserProfile from './views/UserProfile';
import HelpSection from './views/HelpSection';
import ContactSection from './views/ContactSection';


const Router = ({ addToCart }) => {
    const { user } = useSession();

    return (
        <BrowserRouter>
            <main>
                <Routes>
                    {/* Redirect logged-in users away from login and registration pages */}
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/" /> : <LoginView />}
                    />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="/" /> : <Registration />}
                    />

                    {/* Redirect users without admin rights to the homepage */}
                    <Route
                        path="/dashboard"
                        element={user && user.rol ? <Dashboard /> : <Navigate to="/" />}
                    />

                    {/* Only logged-in users can access UserDashboard */}
                    <Route
                        path="/userdashboard"
                        element={user ? <UserDashboard /> : <Navigate to="/" />}
                    />

                    {/* Other routes */}
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/help" element={<HelpSection />} />
                    <Route path="/contact" element={<ContactSection />} />

                    <Route path="/" element={<HomePage />} />
                    <Route path="/info" element={<RingSizeGuide />} />
                    <Route path="/productall" element={<ProductsAll addToCart={addToCart} />} />
                    <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
                </Routes>
            </main>

            <Toaster position="top-right" richColors />
        </BrowserRouter>
    );
};

export default Router;
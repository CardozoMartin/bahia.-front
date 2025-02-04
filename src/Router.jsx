import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Dashboard from './views/Dashboard'
import HomePage from './views/HomePage'




const Router = () => {
    return (
        <BrowserRouter>

            <main>
                
                <Routes>
                    {/*<Route exact path="/" element={<HomePageViews></HomePageViews>} />*/}
                    
                    <Route exact path="/dashboard" element={<Dashboard></Dashboard>} />
                    <Route exact path="/" element={<HomePage></HomePage>} />
                    



                </Routes>
            </main>

            <Toaster position="top-right" richColors />
        </BrowserRouter>
    )
}

export default Router
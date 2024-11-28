import React from 'react';
import "../CSS/RoutePage.css";
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import AdminPage from '../Pages/AdminPage';
import LogoutPage from '../Pages/LogoutPage';
import ProfilePage from '../Pages/ProfilePage';
import HomePage from "../Pages/HomePage";
import ProtectedRoute from './ProtecedRoute';
import PageNotFound from '../Pages/PageNotFound';
const RoutePage = () => {
    const location = useLocation();

    // Convert isAuthenticate to boolean
    const isAuthenticate = sessionStorage.getItem('isAuth') === 'true';
    const isAdmin = sessionStorage.getItem('role') === 'admin';
    return (
        <div>
            {location.pathname !== '/' && (
                <nav className='nav'>
                    <Link to='/home'>HOME</Link>
                    {isAdmin && <Link to='/admin'>ADMIN</Link>}
                    <Link to='/profile'>PROFILE</Link>
                    <Link to='/logout'>LOGOUT</Link>
                </nav>
            )}
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute isAuthenticate={isAuthenticate}>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                {isAdmin && <Route
                    path="/admin"
                    element={
                        <ProtectedRoute isAuthenticate={isAuthenticate}>
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute isAuthenticate={isAuthenticate}>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/logout" element={<LogoutPage />} />

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
};

export default RoutePage;

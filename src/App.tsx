import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import Home from './pages/Home';

import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedAdminRoute from './admin/components/ProtectedAdminRoute';

export default function App() {
    const [userToken, setUserToken] = useState<string | null>(localStorage.getItem('token'));
    const [adminToken, setAdminTokenState] = useState<string | null>(localStorage.getItem('admin_token'));

    useEffect(() => {
        const syncAuth = () => {
            setUserToken(localStorage.getItem('token'));
            setAdminTokenState(localStorage.getItem('admin_token'));
        };

        window.addEventListener('auth-changed', syncAuth);
        window.addEventListener('admin-auth-changed', syncAuth);
        window.addEventListener('storage', syncAuth);

        return () => {
            window.removeEventListener('auth-changed', syncAuth);
            window.removeEventListener('admin-auth-changed', syncAuth);
            window.removeEventListener('storage', syncAuth);
        };
    }, []);

    return (
        <Routes>
            <Route
                path="/auth"
                element={userToken ? <Navigate to="/" replace /> : <AuthPage />}
            />

            <Route
                path="/"
                element={userToken ? <Home /> : <Navigate to="/auth" replace />}
            />

            <Route
                path="/admin/login"
                element={adminToken ? <Navigate to="/admin/dashboard" replace /> : <AdminLoginPage />}
            />

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedAdminRoute>
                        <AdminDashboardPage />
                    </ProtectedAdminRoute>
                }
            />
        </Routes>
    );
}
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import Home from './pages/Home';

import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedAdminRoute from './admin/components /ProtectedAdminRoute';

export default function App() {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        const syncAuth = () => {
            setToken(localStorage.getItem('token'));
        };

        window.addEventListener('auth-changed', syncAuth);
        window.addEventListener('storage', syncAuth);
        window.addEventListener('admin-auth-changed', syncAuth);

        return () => {
            window.removeEventListener('auth-changed', syncAuth);
            window.removeEventListener('storage', syncAuth);
            window.removeEventListener('admin-auth-changed', syncAuth);
        };
    }, []);

    return (
        <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedAdminRoute>
                        <AdminDashboardPage />
                    </ProtectedAdminRoute>
                }
            />

            <Route
                path="/"
                element={token ? <Home /> : <Navigate to="/auth" replace />}
            />
            <Route
                path="/auth"
                element={!token ? <AuthPage /> : <Navigate to="/" replace />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
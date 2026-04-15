import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import Home from './pages/Home';

import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedAdminRoute from './admin/components/ProtectedAdminRoute';
import ApplicationPage from './pages/ApplicationPage';
import AdminApplicationsPage from './pages/AdminApplicationsPage';
import AdminApplicationDetailsPage from './pages/AdminApplicationDetailsPage';

import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

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

            <Route path="/apply" element={<ApplicationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route
                path="/admin/applications"
                element={
                    <ProtectedAdminRoute>
                        <AdminApplicationsPage />
                    </ProtectedAdminRoute>
                }
            />

            <Route
                path="/admin/applications/:id"
                element={
                    <ProtectedAdminRoute>
                        <AdminApplicationDetailsPage />
                    </ProtectedAdminRoute>
                }
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
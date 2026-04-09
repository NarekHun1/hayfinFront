import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

function App() {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        const syncAuth = () => {
            setToken(localStorage.getItem('token'));
        };

        window.addEventListener('auth-changed', syncAuth);
        window.addEventListener('storage', syncAuth);

        return () => {
            window.removeEventListener('auth-changed', syncAuth);
            window.removeEventListener('storage', syncAuth);
        };
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={token ? <Navigate to="/dashboard" replace /> : <AuthPage />}
            />
            <Route
                path="/dashboard"
                element={token ? <Dashboard /> : <Navigate to="/" replace />}
            />
            <Route
                path="*"
                element={<Navigate to={token ? '/dashboard' : '/'} replace />}
            />
        </Routes>
    );
}

export default App;
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

function App() {
    const token = localStorage.getItem('token');

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
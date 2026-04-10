import { useEffect, useState } from 'react';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';

export default function App() {
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

    return token ? <Home /> : <AuthPage />;
}
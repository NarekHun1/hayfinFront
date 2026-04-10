import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/adminApi';
import {
    getAdminUser,
    getAdminToken,
    isAdminAllowed,
    removeAdminToken,
    setAdminToken,
} from '../utils/adminAuth';
import '../admin/components/AdminLayout.css';

export default function AdminLoginPage() {
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const existingToken = getAdminToken();
    const existingUser = getAdminUser();

    if (existingToken && isAdminAllowed(existingUser)) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await adminLogin(phone.trim(), password);
            console.log('LOGIN RESPONSE:', data);

            if (!data?.token) {
                throw new Error('Token not received');
            }

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('auth-changed'));

            setAdminToken(data.token);

            const parsedUser = getAdminUser();
            console.log('PARSED ADMIN USER:', parsedUser);

            if (!parsedUser) {
                removeAdminToken();
                throw new Error('Failed to parse admin token');
            }

            if (!isAdminAllowed(parsedUser)) {
                removeAdminToken();
                throw new Error(`Access denied. Role: ${parsedUser.role ?? 'unknown'}`);
            }

            navigate('/admin/dashboard', { replace: true });
        } catch (err) {
            console.error('ADMIN LOGIN ERROR:', err);
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login">
            <div className="admin-login__card">
                <div className="admin-login__brand">HAYFIN Admin</div>
                <h1 className="admin-login__title">Sign in</h1>
                <p className="admin-login__subtitle">
                    Enter your credentials to access the admin panel
                </p>

                <form className="admin-login__form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Phone"
                        autoComplete="username"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error ? <div className="admin-login__error">{error}</div> : null}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
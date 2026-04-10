import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/adminApi';
import {
    getAdminUser,
    isAdminAllowed,
    setAdminToken,
    getAdminToken,
    removeAdminToken,
} from '../utils/adminAuth';

import '../admin/components/AdminLayout.css';

export default function AdminLoginPage() {
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // ✅ если уже залогинен → сразу в dashboard
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

            // ❗ УБИРАЕМ обычный user login
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // сохраняем admin token
            setAdminToken(data.token);
            console.log('admin_token after set:', localStorage.getItem('admin_token'));
            console.log('token after set:', localStorage.getItem('token'));
            const user = getAdminUser();
            console.log('PARSED ADMIN USER:', user);

            if (!isAdminAllowed(user)) {
                removeAdminToken();
                throw new Error('You do not have admin access');
            }

            navigate('/admin/dashboard', { replace: true });

        } catch (err) {
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="username"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    {error && (
                        <div className="admin-login__error">{error}</div>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
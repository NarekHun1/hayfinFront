import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/adminApi';
import { getAdminUser, isAdminAllowed, setAdminToken } from '../utils/adminAuth';
import '../admin/components/AdminLayout.css';

export default function AdminLoginPage() {
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await adminLogin(phone, password);

            if (!data?.token) {
                throw new Error('Token not received');
            }

            setAdminToken(data.token);

            const user = getAdminUser();

            if (!isAdminAllowed(user)) {
                throw new Error('You do not have admin access');
            }

            navigate('/admin/dashboard');
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
                    />

                    <input
                        type="password"
                        placeholder="Password"
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
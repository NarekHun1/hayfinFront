import { useState } from 'react';
import type { FormEvent } from 'react';
import '../styles/auth.css';

type AuthMode = 'login' | 'register';



export default function AuthPage() {
    const [mode, setMode] = useState<AuthMode>('login');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);

            if (!API_URL) {
                throw new Error('VITE_API_URL is missing');
            }

            const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';

            const payload =
                mode === 'login'
                    ? {
                        phone: phone.trim(),
                        password,
                    }
                    : {
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        phone: phone.trim(),
                        password,
                    };

            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const raw = await res.text();
            const data = raw ? JSON.parse(raw) : null;

            if (!res.ok) {
                throw new Error(data?.message || 'Authentication failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.dispatchEvent(new Event('auth-changed'));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg-shape auth-bg-shape-1" />
            <div className="auth-bg-shape auth-bg-shape-2" />

            <div className="auth-shell">
                <div className="auth-brand-panel">
                    <div className="auth-brand-badge">HAYFIN</div>

                    <h1 className="auth-brand-title">
                        Smart finance platform for modern clients
                    </h1>

                    <p className="auth-brand-text">
                        Hayfin brings together speed, trust and a clean digital experience
                        for your users. Login or create your account to continue.
                    </p>

                    <div className="auth-brand-points">
                        <div className="auth-point">
                            <span className="auth-point-dot" />
                            Fast and secure access
                        </div>
                        <div className="auth-point">
                            <span className="auth-point-dot" />
                            Clean dashboard experience
                        </div>
                        <div className="auth-point">
                            <span className="auth-point-dot" />
                            Built for a premium finance brand
                        </div>
                    </div>
                </div>

                <div className="auth-card">
                    <div className="auth-card-top">
                        <div>
                            <div className="auth-mini-label">Welcome to</div>
                            <h2 className="auth-title">Hayfin</h2>
                        </div>

                        <div className="auth-tabs">
                            <button
                                type="button"
                                className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
                                onClick={() => {
                                    setMode('login');
                                    setError('');
                                }}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                className={mode === 'register' ? 'auth-tab active' : 'auth-tab'}
                                onClick={() => {
                                    setMode('register');
                                    setError('');
                                }}
                            >
                                Register
                            </button>
                        </div>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {mode === 'register' && (
                            <div className="auth-grid">
                                <div className="auth-field">
                                    <label>First name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="auth-field">
                                    <label>Last name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="auth-field">
                            <label>Phone</label>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="auth-field">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error ? <div className="auth-error">{error}</div> : null}

                        <button className="auth-submit" type="submit" disabled={loading}>
                            {loading
                                ? 'Please wait...'
                                : mode === 'login'
                                    ? 'Login'
                                    : 'Create account'}
                        </button>
                    </form>

                    <div className="auth-footer-text">
                        {mode === 'login' ? (
                            <>
                                Don&apos;t have an account?{' '}
                                <button
                                    type="button"
                                    className="auth-link-btn"
                                    onClick={() => {
                                        setMode('register');
                                        setError('');
                                    }}
                                >
                                    Register
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    className="auth-link-btn"
                                    onClick={() => {
                                        setMode('login');
                                        setError('');
                                    }}
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
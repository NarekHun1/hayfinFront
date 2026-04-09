import { useState } from 'react';
import type { FormEvent } from 'react';

type AuthMode = 'login' | 'register';

type AuthResponse = {
    message: string;
    token: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        phone: string;
    };
};

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

        if (!API_URL) {
            setError('VITE_API_URL is missing');
            return;
        }

        try {
            setLoading(true);

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

            const data = (await res.json().catch(() => null)) as AuthResponse | null;

            console.log('AUTH RESPONSE:', data);

            if (!res.ok || !data) {
                throw new Error(data?.message || 'Authentication failed');
            }

            if (!data.token) {
                throw new Error('Token not found in response');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.dispatchEvent(new Event('auth-changed'));
        } catch (err) {
            console.error('AUTH ERROR:', err);

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
        <div
            style={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                padding: '20px',
                background: '#f5f7fb',
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    background: '#fff',
                    padding: '24px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                <h1 style={{ margin: 0 }}>
                    {mode === 'login' ? 'Login' : 'Register'}
                </h1>

                {mode === 'register' && (
                    <>
                        <input
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{ padding: '12px' }}
                        />

                        <input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{ padding: '12px' }}
                        />
                    </>
                )}

                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ padding: '12px' }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '12px' }}
                />

                {error ? (
                    <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>
                ) : null}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '12px',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {loading
                        ? 'Loading...'
                        : mode === 'login'
                            ? 'Login'
                            : 'Register'}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setMode((prev) => (prev === 'login' ? 'register' : 'login'));
                        setError('');
                    }}
                    style={{
                        padding: '12px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                    }}
                >
                    {mode === 'login'
                        ? 'Create account'
                        : 'Already have an account? Login'}
                </button>
            </form>
        </div>
    );
}
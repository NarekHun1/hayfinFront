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

            const data = (await res.json()) as AuthResponse;

            console.log('AUTH RESPONSE:', data);

            if (!res.ok) {
                throw new Error(data?.message || 'Authentication failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            console.log('TOKEN SAVED:', localStorage.getItem('token'));
            console.log('USER SAVED:', localStorage.getItem('user'));

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
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '24px',
                    borderRadius: '20px',
                    background: '#fff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                }}
            >
                <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>

                {mode === 'register' && (
                    <>
                        <input
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </>
                )}

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

                {error ? <div style={{ color: 'red' }}>{error}</div> : null}

                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setMode((prev) => (prev === 'login' ? 'register' : 'login'));
                        setError('');
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
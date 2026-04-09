import { useState } from 'react';
import type { FormEvent } from 'react';

type LoginResponse = {
    token?: string;
    access_token?: string;
    user?: {
        id?: number;
        firstName?: string;
        lastName?: string;
        phone?: string;
    };
};

export default function AuthPage() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';

            const body =
                mode === 'login'
                    ? { phone, password }
                    : { firstName, lastName, phone, password };

            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data: LoginResponse | any = await res.json().catch(() => ({}));

            console.log('AUTH RESPONSE =>', data);

            if (!res.ok) {
                throw new Error(
                    data?.message || `${mode === 'login' ? 'Login' : 'Register'} failed`,
                );
            }

            const token = data?.token || data?.access_token || null;
            const user = data?.user || null;

            if (!token) {
                throw new Error('Token not found in response');
            }

            localStorage.setItem('token', token);

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }

            window.dispatchEvent(new Event('auth-changed'));
        } catch (err: any) {
            console.error('AUTH ERROR:', err);
            setError(err?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 20 }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: 420,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    padding: 24,
                    borderRadius: 16,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    background: '#fff',
                }}
            >
                <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>

                {mode === 'register' && (
                    <>
                        <input
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </>
                )}

                <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <div style={{ color: 'red', fontSize: 14 }}>
                        {error}
                    </div>
                )}

                <button type="submit" disabled={loading}>
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
                >
                    {mode === 'login'
                        ? 'Create account'
                        : 'Already have an account? Login'}
                </button>
            </form>
        </div>
    );
}
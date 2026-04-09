import { useState } from 'react';
import '../styles/auth.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthPage() {
    const [mode, setMode] = useState<'register' | 'login'>('register');

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const submit = async () => {
        setLoading(true);
        setError('');

        try {
            const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';

            const payload =
                mode === 'register'
                    ? form
                    : {
                        phone: form.phone,
                        password: form.password,
                    };

            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    typeof data?.message === 'string'
                        ? data.message
                        : 'Սխալ տեղի ունեցավ',
                );
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err.message || 'Սխալ տեղի ունեցավ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-badge">Hayfin</div>

                <h1 className="auth-title">Բարի գալուստ</h1>
                <p className="auth-subtitle">
                    Գրանցվեք կամ մուտք գործեք՝ շարունակելու համար
                </p>

                <div className="auth-tabs">
                    <button
                        type="button"
                        className={mode === 'register' ? 'tab active' : 'tab'}
                        onClick={() => {
                            setMode('register');
                            setError('');
                        }}
                    >
                        Գրանցում
                    </button>

                    <button
                        type="button"
                        className={mode === 'login' ? 'tab active' : 'tab'}
                        onClick={() => {
                            setMode('login');
                            setError('');
                        }}
                    >
                        Մուտք
                    </button>
                </div>

                <div className="auth-form">
                    {mode === 'register' && (
                        <>
                            <input
                                name="firstName"
                                placeholder="Անուն"
                                value={form.firstName}
                                onChange={handleChange}
                                className="auth-input"
                            />

                            <input
                                name="lastName"
                                placeholder="Ազգանուն"
                                value={form.lastName}
                                onChange={handleChange}
                                className="auth-input"
                            />
                        </>
                    )}

                    <input
                        name="phone"
                        placeholder="Հեռախոսահամար"
                        value={form.phone}
                        onChange={handleChange}
                        className="auth-input"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Գաղտնաբառ"
                        value={form.password}
                        onChange={handleChange}
                        className="auth-input"
                    />

                    {error && <div className="auth-error">{error}</div>}

                    <button
                        type="button"
                        className="auth-button"
                        onClick={submit}
                        disabled={loading}
                    >
                        {loading
                            ? 'Խնդրում ենք սպասել...'
                            : mode === 'register'
                                ? 'Գրանցվել'
                                : 'Մուտք գործել'}
                    </button>
                </div>
            </div>
        </div>
    );
}
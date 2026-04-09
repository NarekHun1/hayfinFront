import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export default function AuthPage() {
    const navigate = useNavigate();

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
        if (!API_URL) {
            setError('VITE_API_URL նշված չէ');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';

            const payload =
                mode === 'register'
                    ? {
                        firstName: form.firstName.trim(),
                        lastName: form.lastName.trim(),
                        phone: form.phone.trim(),
                        password: form.password,
                    }
                    : {
                        phone: form.phone.trim(),
                        password: form.password,
                    };

            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            let data: any = {};
            try {
                data = await res.json();
            } catch {
                data = {};
            }

            if (!res.ok) {
                const message = Array.isArray(data?.message)
                    ? data.message[0]
                    : data?.message || 'Սերվերի սխալ';
                throw new Error(message);
            }

            if (!data?.token || !data?.user) {
                throw new Error('Սերվերի պատասխանը սխալ է');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.dispatchEvent(new Event('auth-changed'));
            navigate('/dashboard', { replace: true });
        } catch (err: any) {
            if (err instanceof TypeError) {
                setError('Կապ backend-ի հետ չստացվեց։ Ստուգիր VITE_API_URL և CORS-ը');
            } else {
                setError(err?.message || 'Սխալ տեղի ունեցավ');
            }
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

                    {error ? <div className="auth-error">{error}</div> : null}

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
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
                throw new Error('API հասցեն բացակայում է');
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
                throw new Error(data?.message || 'Նույնականացման սխալ');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.dispatchEvent(new Event('auth-changed'));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ինչ-որ սխալ տեղի ունեցավ');
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
                        Վարի ֆինանսավորում մինչև 4.000.000 դրամ՝ արագ և հարմար
                    </h1>

                    <p className="auth-brand-text">
                        Մենք առաջարկում ենք արագ և հարմար ֆինանսավորում՝ պարզ գործընթացով
                        և վստահելի պայմաններով։
                    </p>

                    <div className="auth-brand-points">
                        <div className="auth-point">
                            <span className="auth-point-dot" />
                            Գումարի տրամադրում՝ 100.000 - 4.000.000 դրամ
                        </div>
                        <div className="auth-point">
                            <span className="auth-point-dot" />
                            Տարեկան տոկոսադրույք՝ սկսած 11%-ից
                        </div>
                        <div className="auth-point">
                            <span className="auth-point-dot" />
                            Արագ հաստատում
                        </div>
                        <div className="auth-point">
                            <span className="auth-point-dot" />
                            Քո ճկուն ֆինանսական գործընկերը
                        </div>
                        <div className="auth-point">
                            <span className="auth-point-dot" />
                            077 882925
                        </div>
                        <div className="auth-point">
                            <span className="auth-point-dot" />
                            094 657767
                        </div>
                    </div>
                </div>

                <div className="auth-card">
                    <div className="auth-card-top">
                        <div className="auth-mobile-info">
                            <div className="auth-mobile-text">
                                ֆինանսավորում մինչև 4.000.000 դրամ
                                Արագ պատասխան • Պարզ գործընթաց • Վստահելի պայմաններ
                            </div>
                        </div>

                        <div>
                            <div className="auth-mini-label">Բարի գալուստ</div>
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
                                Մուտք
                            </button>
                            <button
                                type="button"
                                className={mode === 'register' ? 'auth-tab active' : 'auth-tab'}
                                onClick={() => {
                                    setMode('register');
                                    setError('');
                                }}
                            >
                                Գրանցում
                            </button>
                        </div>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {mode === 'register' && (
                            <div className="auth-grid">
                                <div className="auth-field">
                                    <label>Անուն</label>
                                    <input
                                        type="text"
                                        placeholder="Մուտքագրեք անունը"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="auth-field">
                                    <label>Ազգանուն</label>
                                    <input
                                        type="text"
                                        placeholder="Մուտքագրեք ազգանունը"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="auth-field">
                            <label>Հեռախոսահամար</label>
                            <input
                                type="text"
                                placeholder="Մուտքագրեք հեռախոսահամարը"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="auth-field">
                            <label>Գաղտնաբառ</label>
                            <input
                                type="password"
                                placeholder="Մուտքագրեք գաղտնաբառը"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error ? <div className="auth-error">{error}</div> : null}

                        <button className="auth-submit" type="submit" disabled={loading}>
                            {loading
                                ? 'Խնդրում ենք սպասել...'
                                : mode === 'login'
                                    ? 'Մուտք գործել'
                                    : 'Ստեղծել հաշիվ'}
                        </button>
                    </form>

                    <div className="auth-footer-text">
                        {mode === 'login' ? (
                            <>
                                Հաշիվ չունե՞ք{' '}
                                <button
                                    type="button"
                                    className="auth-link-btn"
                                    onClick={() => {
                                        setMode('register');
                                        setError('');
                                    }}
                                >
                                    Գրանցվել
                                </button>
                            </>
                        ) : (
                            <>
                                Արդեն ունե՞ք հաշիվ{' '}
                                <button
                                    type="button"
                                    className="auth-link-btn"
                                    onClick={() => {
                                        setMode('login');
                                        setError('');
                                    }}
                                >
                                    Մուտք
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
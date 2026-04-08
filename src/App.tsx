import { useEffect, useState } from 'react';

type HealthResponse = {
    status: string;
    message: string;
    time: string;
};

function App() {
    const [data, setData] = useState<HealthResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/health`
                );

                if (!res.ok) throw new Error();

                const json = await res.json();
                setData(json);
            } catch {
                setError('Backend недоступен');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Hayfin</h1>
                <p style={styles.subtitle}>
                    Fullstack система уже запущена 🚀
                </p>

                <div style={styles.statusBlock}>
                    {loading && (
                        <p style={styles.loading}>Проверяем backend...</p>
                    )}

                    {error && (
                        <div style={styles.error}>
                            ❌ {error}
                        </div>
                    )}

                    {data && (
                        <div style={styles.success}>
                            <p>✅ Backend подключён</p>
                            <p><strong>Status:</strong> {data.status}</p>
                            <p><strong>Message:</strong> {data.message}</p>
                            <p><strong>Time:</strong> {data.time}</p>
                        </div>
                    )}
                </div>

                <div style={styles.footer}>
                    <p>Frontend: Vercel</p>
                    <p>Backend: Railway</p>
                    <p>Database: PostgreSQL</p>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background:
            'linear-gradient(135deg, #020617, #0f172a, #1e293b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        color: '#fff',
    },
    card: {
        width: '100%',
        maxWidth: 700,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: 24,
        padding: 40,
        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        textAlign: 'center',
    },
    title: {
        fontSize: 48,
        marginBottom: 10,
        background: 'linear-gradient(90deg,#38bdf8,#6366f1)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
    },
    subtitle: {
        opacity: 0.7,
        marginBottom: 30,
    },
    statusBlock: {
        marginTop: 20,
    },
    loading: {
        opacity: 0.6,
    },
    error: {
        background: '#7f1d1d',
        padding: 16,
        borderRadius: 12,
        marginTop: 20,
    },
    success: {
        background: '#064e3b',
        padding: 20,
        borderRadius: 12,
        marginTop: 20,
        textAlign: 'left',
    },
    footer: {
        marginTop: 30,
        opacity: 0.5,
        fontSize: 14,
    },
};

export default App;
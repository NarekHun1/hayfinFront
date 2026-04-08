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
        const loadHealth = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/health`);
                if (!res.ok) {
                    throw new Error('Backend request failed');
                }

                const json: HealthResponse = await res.json();
                setData(json);
            } catch (e) {
                setError('Не удалось подключиться к backend');
            } finally {
                setLoading(false);
            }
        };

        loadHealth();
    }, []);

    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#0f172a',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Arial, sans-serif',
                padding: '24px',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '700px',
                    background: '#111827',
                    borderRadius: '20px',
                    padding: '32px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
                }}
            >
                <h1 style={{ marginTop: 0 }}>Hayfin Frontend</h1>
                <p>Frontend запущен и пытается получить ответ от backend.</p>

                {loading && <p>Загрузка...</p>}

                {error && (
                    <div
                        style={{
                            marginTop: '20px',
                            padding: '16px',
                            borderRadius: '12px',
                            background: '#7f1d1d',
                        }}
                    >
                        {error}
                    </div>
                )}

                {data && (
                    <div
                        style={{
                            marginTop: '20px',
                            padding: '20px',
                            borderRadius: '12px',
                            background: '#1f2937',
                        }}
                    >
                        <p><strong>Status:</strong> {data.status}</p>
                        <p><strong>Message:</strong> {data.message}</p>
                        <p><strong>Time:</strong> {data.time}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
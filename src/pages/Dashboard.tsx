import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

type User = {
    id?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
};

export default function Dashboard() {
    const navigate = useNavigate();

    const user: User | null = useMemo(() => {
        try {
            const raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth-changed'));
        navigate('/', { replace: true });
    };

    return (
        <div className="dashboard">
            <div className="dashboard-card">
                <div className="dashboard-badge">Hayfin</div>

                <h1 className="dashboard-title">
                    Բարև, {user?.firstName || 'օգտատեր'} 👋
                </h1>

                <p className="dashboard-text">
                    Դուք հաջողությամբ մուտք եք գործել ձեր հաշիվ։
                </p>

                <div className="dashboard-info">
                    <div className="dashboard-row">
                        <span className="dashboard-label">Անուն</span>
                        <span className="dashboard-value">{user?.firstName || '-'}</span>
                    </div>

                    <div className="dashboard-row">
                        <span className="dashboard-label">Ազգանուն</span>
                        <span className="dashboard-value">{user?.lastName || '-'}</span>
                    </div>

                    <div className="dashboard-row">
                        <span className="dashboard-label">Հեռախոսահամար</span>
                        <span className="dashboard-value">{user?.phone || '-'}</span>
                    </div>
                </div>

                <button className="dashboard-button" onClick={logout}>
                    Դուրս գալ
                </button>
            </div>
        </div>
    );
}
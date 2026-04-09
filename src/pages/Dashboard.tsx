import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();

    const user = useMemo(() => {
        try {
            const rawUser = localStorage.getItem('user');
            return rawUser ? JSON.parse(rawUser) : null;
        } catch {
            return null;
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth-changed'));
        navigate('/', { replace: true });
    };

    return (
        <div className="dashboard">
            <div className="dashboard-card">
                <h1 className="dashboard-title">
                    Բարև, {user?.firstName || 'օգտատեր'}
                </h1>

                <p className="dashboard-text">
                    Դուք հաջողությամբ մուտք եք գործել համակարգ։
                </p>

                <button className="dashboard-button" onClick={handleLogout}>
                    Դուրս գալ
                </button>
            </div>
        </div>
    );
}
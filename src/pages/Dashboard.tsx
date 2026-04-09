import '../styles/dashboard.css';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
    id?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
};

export default function Dashboard() {
    const navigate = useNavigate();

    const user = useMemo<User | null>(() => {
        try {
            const rawUser = localStorage.getItem('user');
            if (!rawUser) return null;

            const parsed = JSON.parse(rawUser);
            if (!parsed || typeof parsed !== 'object') return null;

            return parsed;
        } catch (error) {
            console.error('Invalid user in localStorage:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
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
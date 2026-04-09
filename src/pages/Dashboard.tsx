import '../styles/dashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
};

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        try {
            const rawUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/', { replace: true });
                return;
            }

            if (!rawUser) {
                setUser(null);
                return;
            }

            const parsed = JSON.parse(rawUser) as User;
            setUser(parsed);
        } catch (error) {
            console.error('Dashboard parse error:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('auth-changed'));
            navigate('/', { replace: true });
        }
    }, [navigate]);

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
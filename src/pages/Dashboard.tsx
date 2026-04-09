import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    let user: any = null;

    try {
        const rawUser = localStorage.getItem('user');
        user = rawUser ? JSON.parse(rawUser) : null;
    } catch (e) {
        console.error('Invalid user in localStorage:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

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
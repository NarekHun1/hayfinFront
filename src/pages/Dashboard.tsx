import '../styles/dashboard.css';

export default function Dashboard() {
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;

    return (
        <div className="dashboard">
            <div className="dashboard-card">
                <h1 className="dashboard-title">
                    Բարև, {user?.firstName || 'օգտատեր'}
                </h1>

                <p className="dashboard-text">
                    Դուք հաջողությամբ մուտք եք գործել համակարգ։
                </p>

                <button
                    className="dashboard-button"
                    onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.href = '/';
                    }}
                >
                    Դուրս գալ
                </button>
            </div>
        </div>
    );
}
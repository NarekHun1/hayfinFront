import '../styles/dashboard.css';

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard">
            <div className="dashboard-card">
                <div className="dashboard-badge">Hayfin</div>
                <h1 className="dashboard-title">
                    Բարև, {user.firstName || 'օգտատեր'} 👋
                </h1>
                <p className="dashboard-text">
                    Դուք հաջողությամբ մուտք եք գործել ձեր անձնական էջ։
                </p>

                <button
                    className="dashboard-button"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = '/';
                    }}
                >
                    Դուրս գալ
                </button>
            </div>
        </div>
    );
}
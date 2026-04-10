import Header from './Header';
import '../styles/Home.css';

export default function Home() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    return (
        <div className="home-page">
            <Header />

            <main className="home-hero">
                <div className="home-hero__content">
                    <span className="home-badge">HAYFIN</span>

                    <h1 className="home-title">
                        Բարի գալուստ{user?.firstName ? `, ${user.firstName}` : ''}
                    </h1>

                    <p className="home-description">
                        Արագ, հարմար և վստահելի ֆինանսական լուծումներ՝ հենց քեզ համար։
                    </p>

                    <div className="home-hero__actions">
                        <button className="home-btn home-btn--primary">
                            Ստանալ առաջարկ
                        </button>
                        <button className="home-btn home-btn--ghost">
                            Իմանալ ավելին
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
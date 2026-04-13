import Header from './Header';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const navigate = useNavigate();

    const handleOpenApplication = () => {
        navigate('/application');
    };

    return (
        <div className="home-page">
            <Header />

            <main className="home-main">
                <section className="home-hero">
                    <div className="home-hero__content">
                        <span className="home-badge">HAYFIN • Ֆինանսավորում</span>

                        <h1 className="home-title">
                            Արագ ֆինանսավորում՝
                            <span> վստահելի և հարմար</span>
                        </h1>

                        <p className="home-description">
                            Ստացիր ֆինանսավորում պարզ գործընթացով, արագ հաստատմամբ և
                            հարմար պայմաններով։
                            {user?.firstName ? ` Բարի գալուստ, ${user.firstName}։` : ''}
                        </p>

                        <div className="home-points">
                            <div className="home-point">✔ 100.000 - 4.000.000 դրամ</div>
                            <div className="home-point">✔ Տարեկան տոկոսադրույք՝ սկսած 11%-ից</div>
                            <div className="home-point">✔ Արագ հաստատում և պարզ գործընթաց</div>
                        </div>

                        <div className="home-actions">
                            <button
                                className="home-btn home-btn--primary"
                                onClick={handleOpenApplication}
                                type="button"
                            >
                                Ստանալ առաջարկ
                            </button>

                            <a
                                className="home-btn home-btn--secondary"
                                href="tel:077882925"
                            >
                                Զանգահարել հիմա
                            </a>
                        </div>

                        <a className="home-phone-inline" href="tel:077882925">
                            077 882925
                        </a>
                    </div>

                    <div className="home-hero__visual">
                        <div className="home-card">
                            <div className="home-card__glow" />
                            <div className="home-card__glow home-card__glow--second" />

                            <div className="home-card__top">
                                <span className="home-card__badge">HAYFIN</span>
                                <span className="home-card__status">Արագ պատասխան</span>
                            </div>

                            <div className="home-card__header">
                                <h2>Քո ճկուն ֆինանսական գործընկերը</h2>
                                <p>
                                    Հարմար լուծումներ անձնական և բիզնես նպատակների համար։
                                </p>
                            </div>

                            <div className="home-card__metrics">
                                <div className="metric-box">
                                    <strong>4.000.000</strong>
                                    <span>մինչև դրամ</span>
                                </div>
                                <div className="metric-box">
                                    <strong>11%-ից</strong>
                                    <span>սկսած</span>
                                </div>
                            </div>

                            <div className="home-card__list">
                                <div className="home-card__item">
                                    <div className="home-card__icon">₳</div>
                                    <div>
                                        <strong>Մեծ գումարի հասանելիություն</strong>
                                        <p>Ֆինանսավորում՝ պարզ և հարմար պայմաններով</p>
                                    </div>
                                </div>

                                <div className="home-card__item">
                                    <div className="home-card__icon">%</div>
                                    <div>
                                        <strong>Թափանցիկ պայմաններ</strong>
                                        <p>Հասկանալի տոկոսադրույք և վստահելի մոտեցում</p>
                                    </div>
                                </div>

                                <div className="home-card__item">
                                    <div className="home-card__icon">✓</div>
                                    <div>
                                        <strong>Արագ հաստատում</strong>
                                        <p>Պատասխան հնարավորինս սեղմ ժամկետում</p>
                                    </div>
                                </div>
                            </div>

                            <div className="home-contact">
                                <span className="home-contact__label">Կապ մեզ հետ</span>
                                <a className="home-contact__phone" href="tel:077882925">
                                    077 882925
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <div className="mobile-sticky-bar">
                <a href="tel:077882925" className="mobile-sticky-bar__call">
                    Զանգահարել
                </a>
                <button
                    className="mobile-sticky-bar__apply"
                    onClick={handleOpenApplication}
                    type="button"
                >
                    Ստանալ առաջարկ
                </button>
            </div>
        </div>
    );
}
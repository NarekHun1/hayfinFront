import { FiZap, FiShield, FiTrendingUp, FiLayers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/ServicesPage.css';

export default function ServicesPage() {
    return (
        <main className="services-page">

            {/* HERO */}
            <section className="services-hero">
                <div className="services-hero__glow" />
                <div className="container">
                    <h1>
                        Ժամանակակից ֆինանսական լուծումներ
                    </h1>

                    <p>
                        Մենք առաջարկում ենք ճկուն և արագ ֆինանսական օգնություն՝
                        հարմարեցված ձեր նպատակներին և հնարավորություններին։
                    </p>
                </div>
            </section>

            {/* SERVICES */}
            <section className="services-grid-section">
                <div className="container services-grid">

                    <div className="service-card">
                        <FiLayers />
                        <h3>Անհատական ֆինանսավորում</h3>
                        <p>
                            Ստացեք անհրաժեշտ ֆինանսական օգնություն ցանկացած նպատակի համար՝
                            պարզ և հասկանալի պայմաններով։
                        </p>
                    </div>

                    <div className="service-card">
                        <FiZap />
                        <h3>Արագ ֆինանսական աջակցություն</h3>
                        <p>
                            Արագ որոշում և արագ փոխանցում՝ առանց բարդ գործընթացների։
                        </p>
                    </div>

                    <div className="service-card">
                        <FiTrendingUp />
                        <h3>Բիզնեսի ֆինանսավորում</h3>
                        <p>
                            Աջակցություն ձեր բիզնեսի աճի և զարգացման համար։
                        </p>
                    </div>

                    <div className="service-card">
                        <FiShield />
                        <h3>Անհատական մոտեցում</h3>
                        <p>
                            Յուրաքանչյուր հաճախորդ ստանում է իր համար լավագույն տարբերակը։
                        </p>
                    </div>

                </div>
            </section>

            {/* ADVANTAGES */}
            <section className="services-advantages">
                <div className="container">
                    <h2>Ինչու ընտրել մեզ</h2>

                    <div className="advantages-grid">
                        <div>⚡ Արագ արձագանք</div>
                        <div>📱 Առանց բարդությունների</div>
                        <div>🔒 Ապահով և վստահելի</div>
                        <div>💬 Մշտական աջակցություն</div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="services-cta">
                <div className="container">
                    <h2>Սկսեք հիմա</h2>
                    <p>
                        Լրացրեք հայտը և ստացեք լավագույն ֆինանսական առաջարկը
                    </p>

                    <Link to="/apply" className="services-btn">
                        Լրացնել հայտ
                    </Link>
                </div>
            </section>

        </main>
    );
}
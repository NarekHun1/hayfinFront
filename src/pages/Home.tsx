import Header from './Header';
import '../styles/Home.css';

export default function Home() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    return (
        <div className="home-page">
            <Header />

            <main className="home-main">
                <section className="home-hero">
                    <div className="home-hero__content">
                        <span className="home-badge">HAYFIN</span>

                        <h1 className="home-title">
                            Ֆինանսավորում՝ <span>արագ, հարմար</span> և վստահելի
                        </h1>

                        <p className="home-description">
                            Մենք առաջարկում ենք արագ և հարմար ֆինանսավորում՝ պարզ գործընթացով
                            և վստահելի պայմաններով։
                            {user?.firstName ? ` Բարի գալուստ, ${user.firstName}։` : ''}
                        </p>

                        <div className="home-actions">
                            <button className="home-btn home-btn--primary">
                                Ստանալ առաջարկ
                            </button>
                            <button className="home-btn home-btn--secondary">
                                Իմանալ ավելին
                            </button>
                        </div>

                        <div className="home-stats">
                            <div className="home-stat">
                                <strong>100.000 - 4.000.000 դրամ</strong>
                                <span>Գումարի տրամադրում</span>
                            </div>

                            <div className="home-stat">
                                <strong>11%-ից</strong>
                                <span>Տարեկան տոկոսադրույք</span>
                            </div>

                            <div className="home-stat">
                                <strong>Արագ</strong>
                                <span>Հաստատման գործընթաց</span>
                            </div>
                        </div>
                    </div>

                    <div className="home-hero__visual">
                        <div className="home-card">
                            <div className="home-card__glow" />

                            <div className="home-card__header">
                                <span className="home-card__badge">HAYFIN</span>
                                <h2>Քո ճկուն ֆինանսական գործընկերը</h2>
                                <p>
                                    Պարզ, արագ և վստահելի լուծումներ՝ քո ֆինանսական
                                    կարիքների համար։
                                </p>
                            </div>

                            <div className="home-card__list">
                                <div className="home-card__item">
                                    <div className="home-card__icon">₳</div>
                                    <div>
                                        <strong>Ֆինանսավորում մինչև 4.000.000 դրամ</strong>
                                        <p>Հարմար պայմաններով և հասկանալի գործընթացով</p>
                                    </div>
                                </div>

                                <div className="home-card__item">
                                    <div className="home-card__icon">%</div>
                                    <div>
                                        <strong>Սկսած 11% տոկոսադրույքից</strong>
                                        <p>Թափանցիկ և վստահելի պայմաններ յուրաքանչյուր հաճախորդի համար</p>
                                    </div>
                                </div>

                                <div className="home-card__item">
                                    <div className="home-card__icon">✓</div>
                                    <div>
                                        <strong>Արագ հաստատում</strong>
                                        <p>Դիմումից մինչև պատասխան՝ հնարավորինս արագ</p>
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

                <section className="home-features">
                    <div className="home-section-head">
                        <span className="home-section-badge">Առավելություններ</span>
                        <h2>Ինչո՞ւ ընտրել Hayfin</h2>
                        <p>
                            Մենք ստեղծել ենք պարզ և վստահելի համակարգ, որպեսզի ֆինանսավորում
                            ստանալը լինի արագ, հարմար և հասկանալի։
                        </p>
                    </div>

                    <div className="home-features__grid">
                        <article className="feature-card">
                            <div className="feature-card__icon">01</div>
                            <h3>Պարզ գործընթաց</h3>
                            <p>
                                Դիմումը լրացվում է հեշտ և առանց բարդ քայլերի, որպեսզի
                                խնայես քո ժամանակը։
                            </p>
                        </article>

                        <article className="feature-card">
                            <div className="feature-card__icon">02</div>
                            <h3>Արագ պատասխան</h3>
                            <p>
                                Մենք գնահատում ենք արագությունը և աշխատում ենք հնարավորինս
                                արագ տրամադրել պատասխան։
                            </p>
                        </article>

                        <article className="feature-card">
                            <div className="feature-card__icon">03</div>
                            <h3>Վստահելի պայմաններ</h3>
                            <p>
                                Թափանցիկ և հասկանալի պայմաններ՝ առանց ավելորդ բարդությունների։
                            </p>
                        </article>
                    </div>
                </section>

                <section className="home-offer">
                    <div className="home-offer__content">
                        <span className="home-section-badge">Hayfin</span>
                        <h2>Ֆինանսական աջակցություն՝ այն պահին, երբ դրա կարիքն ունես</h2>
                        <p>
                            Անկախ նրանից՝ քեզ պետք է արագ լուծում անձնական կամ բիզնես
                            նպատակների համար, Hayfin-ը պատրաստ է առաջարկել ճկուն և հարմար
                            տարբերակներ։
                        </p>
                    </div>

                    <div className="home-offer__box">
                        <div className="offer-point">
                            <strong>100.000 - 4.000.000 դրամ</strong>
                            <span>Ֆինանսավորման չափ</span>
                        </div>
                        <div className="offer-point">
                            <strong>11%-ից</strong>
                            <span>Տարեկան տոկոսադրույք</span>
                        </div>
                        <div className="offer-point">
                            <strong>077 882925</strong>
                            <span>Կապի համար</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
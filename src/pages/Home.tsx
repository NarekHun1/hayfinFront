import Header from './Header.tsx';
import './Home.css';

export default function Home() {
    return (
        <div className="home-page">
            <Header />

            <section className="home-hero">
                <div className="home-hero__content">
                    <div className="home-badge">Ֆինանսավորում արագ և պարզ</div>

                    <h1 className="home-title">
                        Վարկ ստանալ <span>արագ</span> և հարմար
                    </h1>

                    <p className="home-description">
                        Hayfin-ը օգնում է օգտատերերին արագ դիմել, ստանալ նախնական
                        գնահատում և ընտրել հարմար ֆինանսական լուծում առանց ավելորդ
                        բարդությունների։
                    </p>

                    <div className="home-actions">
                        <button className="home-btn home-btn--primary">Դիմել հիմա</button>
                        <button className="home-btn home-btn--secondary">Իմանալ ավելին</button>
                    </div>

                    <div className="home-stats">
                        <div className="home-stat">
                            <strong>100,000 - 4,000,000֏</strong>
                            <span>Գումարի տրամադրում</span>
                        </div>

                        <div className="home-stat">
                            <strong>11%-ից</strong>
                            <span>Տարեկան տոկոսադրույք</span>
                        </div>

                        <div className="home-stat">
                            <strong>Արագ</strong>
                            <span>Նախնական հաստատում</span>
                        </div>
                    </div>
                </div>

                <div className="home-hero__visual">
                    <div className="home-card">
                        <div className="home-card__top">
                            <div className="home-card__label">Hayfin</div>
                            <h2 className="home-card__title">
                                Քո ճկուն ֆինանսական գործընկերը
                            </h2>
                        </div>

                        <div className="home-card__list">
                            <div className="home-card__item">
                                <div className="home-card__icon">01</div>
                                <div>
                                    <strong>Արագ հայտ</strong>
                                    <p>Լրացրու տվյալները մի քանի րոպեում։</p>
                                </div>
                            </div>

                            <div className="home-card__item">
                                <div className="home-card__icon">02</div>
                                <div>
                                    <strong>Նախնական գնահատում</strong>
                                    <p>Ստացիր արագ պատասխան և հարմար տարբերակներ։</p>
                                </div>
                            </div>

                            <div className="home-card__item">
                                <div className="home-card__icon">03</div>
                                <div>
                                    <strong>Պարզ գործընթաց</strong>
                                    <p>Հեշտ UX, մաքուր դիզայն և վստահելի ներկայացում։</p>
                                </div>
                            </div>
                        </div>

                        <div className="home-card__bottom">
                            <div className="home-pill">Արագ հաստատում</div>
                            <div className="home-pill">Անվտանգ գործընթաց</div>
                            <div className="home-pill">Պրեմիում սպասարկում</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
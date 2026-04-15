import { FiUsers, FiShield, FiZap, FiAward } from 'react-icons/fi';
import '../styles/AboutPage.css';

export default function AboutPage() {
    return (
        <main className="about-page">

            {/* HERO */}
            <section className="about-hero">
                <div className="about-hero__glow" />

                <div className="container">
                    <h1>
                        Ձեր վստահելի ֆինանսական գործընկերը
                    </h1>

                    <p>
                        Մենք ստեղծում ենք պարզ, արագ և վստահելի ֆինանսական լուծումներ,
                        որոնք օգնում են մարդկանց հասնել իրենց նպատակներին առանց բարդությունների։
                    </p>
                </div>
            </section>

            {/* STORY */}
            <section className="about-section">
                <div className="container about-grid">

                    <div className="about-text">
                        <h2>Մեր առաքելությունը</h2>

                        <p>
                            Մեր նպատակն է ապահովել հասանելի և հարմար ֆինանսական աջակցություն
                            յուրաքանչյուր մարդու համար՝ անկախ նրա իրավիճակից։
                        </p>

                        <p>
                            Մենք հավատում ենք, որ ֆինանսական ծառայությունները պետք է լինեն
                            պարզ, թափանցիկ և արագ։
                        </p>
                    </div>

                    <div className="about-card">
                        <FiUsers />
                        <h3>Մարդկանց վրա կենտրոնացած</h3>
                        <p>Մենք մտածում ենք հաճախորդի հարմարության մասին առաջին հերթին։</p>
                    </div>

                </div>
            </section>

            {/* VALUES */}
            <section className="about-values">
                <div className="container">

                    <h2>Մեր արժեքները</h2>

                    <div className="values-grid">

                        <div className="value-card">
                            <FiZap />
                            <h3>Արագություն</h3>
                            <p>Արագ որոշումներ և արագ գործընթացներ։</p>
                        </div>

                        <div className="value-card">
                            <FiShield />
                            <h3>Ապահովություն</h3>
                            <p>Ձեր տվյալները միշտ պաշտպանված են։</p>
                        </div>

                        <div className="value-card">
                            <FiAward />
                            <h3>Որակ</h3>
                            <p>Մենք առաջարկում ենք միայն լավագույն լուծումները։</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta">
                <div className="container">
                    <h2>Սկսեք հիմա</h2>
                    <p>
                        Կապ հաստատեք մեզ հետ և ստացեք լավագույն առաջարկը
                    </p>

                    <a href="/apply" className="about-btn">
                        Լրացնել հայտ
                    </a>
                </div>
            </section>

        </main>
    );
}
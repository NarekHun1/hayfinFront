import { FiPhoneCall, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import '../styles/ContactPage.css';

export default function ContactPage() {
    const phone = '077882925';
    const displayPhone = '077 88 29 25';
    const address = 'Փոստալ Հակոբ Հակոբյան 3';
    const mapQuery = encodeURIComponent(address);

    return (
        <main className="contact-page">
            <section className="contact-hero">
                <div className="contact-hero__glow contact-hero__glow--one" />
                <div className="contact-hero__glow contact-hero__glow--two" />

                <div className="contact-page__container">
                    <div className="contact-hero__content">
                        <span className="contact-hero__eyebrow">Կապ մեզ հետ</span>

                        <h1 className="contact-hero__title">
                            Մենք միշտ պատրաստ ենք օգնել ձեզ արագ և հարմար լուծումներով
                        </h1>

                        <p className="contact-hero__text">
                            Եթե ցանկանում եք ստանալ խորհրդատվություն, հասկանալ վարկավորման
                            պայմանները կամ պարզապես կապ հաստատել մեզ հետ, մենք հասանելի ենք ձեզ
                            համար։ Մեր թիմը կօգնի ձեզ գտնել ամենահարմար տարբերակը՝ արագ, պարզ և
                            վստահելի ձևով։
                        </p>

                        <div className="contact-hero__actions">
                            <a href={`tel:${phone}`} className="contact-btn contact-btn--primary">
                                <FiPhoneCall />
                                Զանգահարել հիմա
                            </a>

                            <a
                                href={`https://yandex.com/maps/?text=${mapQuery}`}
                                target="_blank"
                                rel="noreferrer"
                                className="contact-btn contact-btn--secondary"
                            >
                                <FiMapPin />
                                Բացել Yandex Navigator-ում
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-info-section">
                <div className="contact-page__container">
                    <div className="contact-grid">
                        <div className="contact-card contact-card--info">
                            <div className="contact-card__badge">Մեր տվյալները</div>

                            <h2 className="contact-card__title">Եկեք կապ հաստատենք</h2>

                            <p className="contact-card__desc">
                                Մենք կարևորում ենք արագ արձագանքը, հարմար կապը և վստահելի
                                համագործակցությունը։ Կարող եք զանգահարել, գրել մեզ սոցիալական
                                հարթակներում կամ այցելել մեր հասցեով։
                            </p>

                            <div className="contact-list">
                                <a href={`tel:${phone}`} className="contact-list__item">
                                    <div className="contact-list__icon">
                                        <FiPhoneCall />
                                    </div>
                                    <div>
                                        <span>Հեռախոսահամար</span>
                                        <strong>{displayPhone}</strong>
                                    </div>
                                </a>

                                <div className="contact-list__item">
                                    <div className="contact-list__icon">
                                        <FiMapPin />
                                    </div>
                                    <div>
                                        <span>Հասցե</span>
                                        <strong>{address}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-socials">
                                <a
                                    href="https://instagram.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-social contact-social--instagram"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram />
                                </a>

                                <a
                                    href="https://t.me/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-social contact-social--telegram"
                                    aria-label="Telegram"
                                >
                                    <FaTelegramPlane />
                                </a>

                                <a
                                    href={`https://wa.me/374${phone.slice(1)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-social contact-social--whatsapp"
                                    aria-label="WhatsApp"
                                >
                                    <FaWhatsapp />
                                </a>
                            </div>
                        </div>

                        <div className="contact-card contact-card--map">
                            <div className="contact-map__top">
                                <div>
                                    <span className="contact-card__badge">Տեղադրություն</span>
                                    <h2 className="contact-card__title">Մեզ կարող եք գտնել այստեղ</h2>
                                </div>
                            </div>

                            <div className="contact-map">
                                <iframe
                                    title="Hayfin location map"
                                    src={`https://yandex.com/map-widget/v1/?text=${mapQuery}&z=16`}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            </div>

                            <div className="contact-map__footer">
                                <p>
                                    Նշված հասցեն այժմ ժամանակավոր է․ հետագայում հեշտությամբ կարող եք
                                    փոխել այն ձեր իրական հասցեով։
                                </p>

                                <a
                                    href={`https://yandex.com/maps/?text=${mapQuery}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-map__link"
                                >
                                    Դիտել մեծ քարտեզով
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
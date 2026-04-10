import '../styles/Header.css';
import hayfin from '../assets/hayfin.png';

export default function Header() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth-changed'));
    };

    return (
        <header className="hayfin-header">
            <div className="hayfin-header__container">
                <a href="/" className="hayfin-header__brand">
                    <img src={hayfin} alt="Hayfin Logo" className="hayfin-header__logo" />
                    <div className="hayfin-header__text">
                        <span className="hayfin-header__title">HAYFIN</span>
                        <span className="hayfin-header__subtitle">
                            Քո ճկուն ֆինանսական գործընկերը
                        </span>
                    </div>
                </a>

                <nav className="hayfin-header__nav">
                    <a href="#about">Մեր մասին</a>
                    <a href="#services">Ծառայություններ</a>
                    <a href="#contact">Կապ</a>
                </nav>

                <div className="hayfin-header__actions">
                    <button
                        type="button"
                        className="hayfin-btn hayfin-btn--primary"
                        onClick={handleLogout}
                    >
                        Դուրս գալ
                    </button>
                </div>

                <button className="hayfin-header__menu" type="button" aria-label="menu">
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}
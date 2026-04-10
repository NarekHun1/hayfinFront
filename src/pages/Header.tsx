import '../styles/Header.css';
import logo from '../assets/hayfin.png';
export default function Header() {
    return (
        <header className="  ">
            <div className="hayfin-header__container">
                <a href="/" className="hayfin-header__brand">
                    <img src={logo} alt="Hayfin Logo" className="hayfin-header__logo" />
                    <div className="hayfin-header__text">
                        <span className="hayfin-header__title">HAYFIN</span>
                        <span className="hayfin-header__subtitle">
              Քո ճկուն ֆինանսական գործընկերը
            </span>
                    </div>
                </a>

                <nav className="hayfin-header__nav">
                    <a href="#services">Ծառայություններ</a>
                    <a href="#about">Մեր մասին</a>
                    <a href="#contact">Կապ</a>
                </nav>

                <div className="hayfin-header__actions">
                    <button className="hayfin-btn hayfin-btn--ghost">Մուտք</button>
                    <button className="hayfin-btn hayfin-btn--primary">Դիմել հիմա</button>
                </div>

                <button className="hayfin-header__menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
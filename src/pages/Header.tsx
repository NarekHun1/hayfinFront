import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.css';
import hayfin from '../assets/hayfin.png';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth-changed'));
        setMenuOpen(false);
    };

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* HEADER */}
            <header className="hayfin-header">
                <div className="hayfin-header__container">

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="hayfin-header__brand"
                        onClick={closeMenu}
                    >
                        <img
                            src={hayfin}
                            alt="Hayfin Logo"
                            className="hayfin-header__logo"
                        />

                        <div className="hayfin-header__text">
                            <span className="hayfin-header__title">HAYFIN</span>
                            <span className="hayfin-header__subtitle">
                                Քո ճկուն ֆինանսական գործընկերը
                            </span>
                        </div>
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hayfin-header__nav">
                        <Link to="/about">Մեր մասին</Link>
                        <Link to="/services">Ծառայություններ</Link>
                        <Link to="/contact">Կապ</Link>
                    </nav>

                    {/* ACTIONS */}
                    <div className="hayfin-header__actions">
                        <a
                            href="tel:077882925"
                            className="hayfin-btn hayfin-btn--ghost"
                        >
                            077 882925
                        </a>

                        <button
                            type="button"
                            className="hayfin-btn hayfin-btn--primary"
                            onClick={handleLogout}
                        >
                            Դուրս գալ
                        </button>
                    </div>

                    {/* BURGER */}
                    <button
                        className={`hayfin-header__menu ${menuOpen ? 'is-active' : ''}`}
                        type="button"
                        aria-label="menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </header>

            {/* BACKDROP */}
            <div
                className={`hayfin-mobile-menu-backdrop ${
                    menuOpen ? 'is-visible' : ''
                }`}
                onClick={closeMenu}
            />

            {/* MOBILE MENU */}
            <aside className={`hayfin-mobile-menu ${menuOpen ? 'is-open' : ''}`}>
                <div className="hayfin-mobile-menu__top">
                    <div className="hayfin-mobile-menu__brand">
                        <img
                            src={hayfin}
                            alt="Hayfin Logo"
                            className="hayfin-mobile-menu__logo"
                        />
                        <div>
                            <div className="hayfin-mobile-menu__title">HAYFIN</div>
                            <div className="hayfin-mobile-menu__subtitle">
                                Քո ճկուն ֆինանսական գործընկերը
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="hayfin-mobile-menu__close"
                        onClick={closeMenu}
                        aria-label="close menu"
                    >
                        ×
                    </button>
                </div>

                {/* MOBILE LINKS */}
                <div className="hayfin-mobile-menu__links">
                    <Link to="/about" onClick={closeMenu}>
                        Մեր մասին
                    </Link>
                    <Link to="/services" onClick={closeMenu}>
                        Ծառայություններ
                    </Link>
                    <Link to="/contact" onClick={closeMenu}>
                        Կապ
                    </Link>
                </div>

                {/* FOOTER */}
                <div className="hayfin-mobile-menu__footer">
                    <a
                        href="tel:077882925"
                        className="hayfin-mobile-menu__phone"
                        onClick={closeMenu}
                    >
                        077 882925
                    </a>

                    <button
                        type="button"
                        className="hayfin-mobile-menu__logout"
                        onClick={handleLogout}
                    >
                        Դուրս գալ
                    </button>
                </div>
            </aside>
        </>
    );
}
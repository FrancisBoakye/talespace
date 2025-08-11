import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../firebase/authService';
import './Navigation.css';

const Navigation = () => {
    const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userDropdownRef = useRef(null);
    const { currentUser } = useAuth();

    const genres = [
        'Mystery',
        'Folktale',
        'True Story',
        'True Crime',
        'Emotional',
        'Fictional',
        'Fantasy',
        'Romance',
        'Thriller',
        'Horror',
        'Adventure',
        'Drama',
        'Comedy'
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsGenreDropdownOpen(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsGenreDropdownOpen(false);
        setIsUserDropdownOpen(false);
    };

    const handleLogout = async () => {
        await logoutUser();
        setIsUserDropdownOpen(false);
        closeMobileMenu();
    };

    return (
        <nav className="navigation">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    TaleSpace
                </Link>

                {/* Mobile menu button */}
                <div
                    className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </div>

                <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <Link to="/" className="nav-link" onClick={closeMobileMenu}>Home</Link>
                    <Link to="/all-stories" className="nav-link" onClick={closeMobileMenu}>All Stories</Link>

                    <div className="genre-dropdown" ref={dropdownRef}>
                        <button
                            className="nav-link genre-button"
                            onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                            aria-expanded={isGenreDropdownOpen}
                        >
                            Genre
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`dropdown-arrow ${isGenreDropdownOpen ? 'open' : ''}`}
                            >
                                <path d="M7 10l5 5 5-5z" />
                            </svg>
                        </button>

                        {isGenreDropdownOpen && (
                            <div className="genre-dropdown-menu">
                                <Link
                                    to="/genre"
                                    className="genre-dropdown-item"
                                    onClick={() => {
                                        setIsGenreDropdownOpen(false);
                                        closeMobileMenu();
                                    }}
                                >
                                    All Genres
                                </Link>
                                {genres.map((genre) => (
                                    <Link
                                        key={genre}
                                        to={`/genre?category=${genre.toLowerCase().replace(' ', '-')}`}
                                        className="genre-dropdown-item"
                                        onClick={() => {
                                            setIsGenreDropdownOpen(false);
                                            closeMobileMenu();
                                        }}
                                    >
                                        {genre}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link to="/about" className="nav-link" onClick={closeMobileMenu}>About</Link>

                    {/* Authentication Section */}
                    {currentUser ? (
                        <div className="user-dropdown" ref={userDropdownRef}>
                            <button
                                className="nav-link user-button"
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                aria-expanded={isUserDropdownOpen}
                            >
                                {currentUser.displayName || 'User'}
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className={`dropdown-arrow ${isUserDropdownOpen ? 'open' : ''}`}
                                >
                                    <path d="M7 10l5 5 5-5z" />
                                </svg>
                            </button>
                            {isUserDropdownOpen && (
                                <div className="user-dropdown-menu">
                                    <button
                                        onClick={handleLogout}
                                        className="user-dropdown-item logout-item"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="nav-link auth-link" onClick={closeMobileMenu}>Login</Link>
                            <Link to="/register" className="nav-link auth-link register-link" onClick={closeMobileMenu}>Register</Link>
                        </div>
                    )}
                </div>

                <div className="social-links">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="Facebook"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>

                    <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="X (Twitter)"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>

                    <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="TikTok"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

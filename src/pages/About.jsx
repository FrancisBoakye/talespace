import React from 'react';
import SEO from '../components/SEO/SEO';
import './About.css';

const About = () => {
    return (
        <>
            <SEO
                title="About TaleSpace - Free Stories Platform"
                description="Learn about TaleSpace, your destination for free stories and books. Discover amazing tales from talented authors across multiple genres."
                keywords="about talespace, free stories platform, online reading, book platform, story website"
                url={window.location.href}
                type="website"
            />

            <div className="about-page">
                <div className="about-hero">
                    <div className="about-content">
                        <h1>About TaleSpace</h1>
                        <p className="hero-subtitle">
                            Where stories come to life and imagination knows no bounds
                        </p>
                    </div>
                </div>

                <div className="about-sections">
                    <section className="about-section">
                        <div className="section-content">
                            <h2>Our Mission</h2>
                            <p>
                                TaleSpace is dedicated to making great storytelling accessible to everyone.
                                We believe that powerful stories have the ability to inspire, educate, and
                                connect people from all walks of life. Our platform provides a space where
                                readers can discover amazing tales and authors can share their creative works
                                with a global audience.
                            </p>
                        </div>
                    </section>

                    <section className="about-section">
                        <div className="section-content">
                            <h2>What We Offer</h2>
                            <div className="features-grid">
                                <div className="feature-card">
                                    <div className="feature-icon">📚</div>
                                    <h3>Free Access</h3>
                                    <p>All stories on TaleSpace are completely free to read. No subscriptions, no hidden fees.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">🌟</div>
                                    <h3>Diverse Genres</h3>
                                    <p>From fantasy and romance to mystery and sci-fi, we have something for every reader.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">📱</div>
                                    <h3>Mobile Friendly</h3>
                                    <p>Read your favorite stories on any device, anywhere, anytime.</p>
                                </div>
                                <div className="feature-card">
                                    <div className="feature-icon">🔍</div>
                                    <h3>Easy Discovery</h3>
                                    <p>Find new stories through our intuitive browsing and search features.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="about-section">
                        <div className="section-content">
                            <h2>Our Community</h2>
                            <p>
                                TaleSpace is more than just a reading platform – it's a community of
                                story lovers. Whether you're here to escape into fantastic worlds,
                                explore different perspectives, or simply enjoy a good tale, you're
                                part of our growing family of readers and storytellers.
                            </p>
                        </div>
                    </section>

                    <section className="about-section">
                        <div className="section-content">
                            <h2>Get Started</h2>
                            <p>
                                Ready to dive into your next great read? Browse our collection by genre,
                                discover trending stories, or let serendipity guide you to something
                                unexpected. Every story is just a click away.
                            </p>
                            <div className="cta-buttons">
                                <a href="/" className="cta-button primary">
                                    Start Reading
                                </a>
                                <a href="/genre" className="cta-button secondary">
                                    Browse Genres
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="about-footer">
                    <div className="footer-content">
                        <h3>Connect With Us</h3>
                        <p>Follow us on social media for updates and featured stories</p>
                        <div className="social-links">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="Facebook"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;

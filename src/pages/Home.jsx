import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import BookshelfGrid from '../components/BookshelfGrid/BookshelfGrid';
import { getPublishedBooks } from '../firebase/bookService';
import './Home.css';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const fetchedBooks = await getPublishedBooks();
                // Set total count for stats
                setTotalBooks(fetchedBooks.length);
                // Limit to latest 6 books for home page display
                const latestBooks = fetchedBooks.slice(0, 6);
                setBooks(latestBooks);
            } catch (err) {
                setError('Failed to load stories');
                console.error('Error fetching books:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <>
            <SEO
                title="TaleSpace - Free Stories & Books Online"
                description="Discover amazing free stories and books. Read fantasy, romance, mystery, thriller, and more genres online for free."
                keywords="free stories, free books, online reading, fantasy stories, romance books, mystery novels, thriller books"
                url={window.location.href}
                type="website"
            />

            <div className="home">
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Discover Amazing <span className="highlight">Stories</span>
                        </h1>
                        <p className="hero-description">
                            Dive into a world of captivating tales. From thrilling adventures to heartwarming romances,
                            find your next favorite story in our growing collection of free books.
                        </p>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">{totalBooks}+</span>
                                <span className="stat-label">Stories</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">
                                    {books.reduce((total, book) => total + (book.totalRead || 0), 0).toLocaleString()}
                                </span>
                                <span className="stat-label">Recent Reads</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">Free</span>
                                <span className="stat-label">Always</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Books Section */}
                {loading ? (
                    <div className="loading-section">
                        <div className="loading-spinner"></div>
                        <p>Loading amazing stories for you...</p>
                    </div>
                ) : error ? (
                    <div className="error-section">
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        <BookshelfGrid
                            books={books}
                            title="Latest Stories"
                        />
                        <div className="view-all-section">
                            <Link to="/all-stories" className="view-all-button">
                                View All {totalBooks} Stories
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                                </svg>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Home;

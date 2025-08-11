import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO/SEO';
import BookshelfGrid from '../components/BookshelfGrid/BookshelfGrid';
import { getPublishedBooks, searchBooks } from '../firebase/bookService';
import './AllStories.css';

const AllStories = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const fetchedBooks = await getPublishedBooks();
                setBooks(fetchedBooks);
                setFilteredBooks(fetchedBooks);
            } catch (err) {
                setError('Failed to load stories');
                console.error('Error fetching books:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        let filtered = [...books];

        // Apply search filter
        if (searchTerm.trim()) {
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt?.seconds * 1000) - new Date(a.createdAt?.seconds * 1000));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.createdAt?.seconds * 1000) - new Date(b.createdAt?.seconds * 1000));
                break;
            case 'mostRead':
                filtered.sort((a, b) => (b.totalRead || 0) - (a.totalRead || 0));
                break;
            case 'alphabetical':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        setFilteredBooks(filtered);
    }, [books, searchTerm, sortBy]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <>
            <SEO
                title="All Stories - TaleSpace"
                description="Browse our complete collection of free stories and books. Find your next great read from our library of fantasy, romance, mystery, thriller, and more."
                keywords="all stories, free books, complete collection, online library, story collection, free reading"
                url={window.location.href}
                type="website"
            />

            <div className="all-stories-page">
                {/* Header Section */}
                <div className="all-stories-header">
                    <div className="header-content">
                        <h1>All Stories</h1>
                        <p>Explore our complete collection of {books.length} amazing stories</p>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="search-filter-section">
                    <div className="search-filter-container">
                        <div className="search-box">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="search-icon">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search stories by title, author, or genre..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="search-input"
                            />
                        </div>

                        <div className="sort-box">
                            <label htmlFor="sort-select">Sort by:</label>
                            <select
                                id="sort-select"
                                value={sortBy}
                                onChange={handleSortChange}
                                className="sort-select"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="mostRead">Most Read</option>
                                <option value="alphabetical">A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="results-info">
                    <div className="results-container">
                        <p className="results-text">
                            {searchTerm ? (
                                <>Showing {filteredBooks.length} results for "{searchTerm}"</>
                            ) : (
                                <>Showing all {filteredBooks.length} stories</>
                            )}
                        </p>
                    </div>
                </div>

                {/* Books Grid */}
                {loading ? (
                    <div className="loading-section">
                        <div className="loading-spinner"></div>
                        <p>Loading all stories...</p>
                    </div>
                ) : error ? (
                    <div className="error-section">
                        <p>{error}</p>
                    </div>
                ) : (
                    <BookshelfGrid
                        books={filteredBooks}
                        title=""
                    />
                )}
            </div>
        </>
    );
};

export default AllStories;

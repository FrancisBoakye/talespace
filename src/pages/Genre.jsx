import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import BookshelfGrid from '../components/BookshelfGrid/BookshelfGrid';
import { getPublishedBooks, getBooksByCategory } from '../firebase/bookService';
import './Genre.css';

const Genre = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [searchParams] = useSearchParams();

    const popularGenres = [
        'all', 'mystery', 'folktale', 'true-story', 'true-crime', 'emotional',
        'fictional', 'fantasy', 'romance', 'thriller', 'horror', 'adventure',
        'drama', 'comedy'
    ];

    useEffect(() => {
        // Check if there's a category parameter in the URL
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const fetchedBooks = await getPublishedBooks();
                setBooks(fetchedBooks);

                // If we have a selected category from URL, filter immediately
                if (selectedCategory !== 'all') {
                    const categoryBooks = await getBooksByCategory(selectedCategory.replace('-', ' '));
                    setFilteredBooks(categoryBooks);
                } else {
                    setFilteredBooks(fetchedBooks);
                }

                // Extract unique categories from books
                const uniqueCategories = [...new Set(fetchedBooks.map(book => book.category.toLowerCase()))];
                setCategories(['all', ...uniqueCategories]);
            } catch (err) {
                console.error('Error fetching books:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleCategoryChange = async (category) => {
        setSelectedCategory(category);
        setLoading(true);

        try {
            if (category === 'all') {
                setFilteredBooks(books);
            } else {
                const categoryBooks = await getBooksByCategory(category);
                setFilteredBooks(categoryBooks);
            }
        } catch (err) {
            console.error('Error filtering books:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="Browse by Genre - TaleSpace"
                description="Explore stories by genre. Find fantasy, romance, mystery, thriller, and more free books organized by category."
                keywords="book genres, fantasy books, romance stories, mystery novels, thriller books, free stories by genre"
                url={window.location.href}
                type="website"
            />

            <div className="genre-page">
                <div className="genre-header">
                    <h1>Browse by Genre</h1>
                    <p>Discover your next favorite story by exploring different genres</p>
                </div>

                <div className="genre-filters">
                    <div className="filter-container">
                        <h3>Categories</h3>
                        <div className="category-buttons">
                            {popularGenres.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                                >
                                    {category === 'all' ? 'All Stories' : category.replace(/\b\w/g, l => l.toUpperCase())}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-section">
                        <div className="loading-spinner"></div>
                        <p>Loading stories...</p>
                    </div>
                ) : (
                    <BookshelfGrid
                        books={filteredBooks}
                        title={selectedCategory === 'all' ? 'All Stories' : `${selectedCategory.replace(/\b\w/g, l => l.toUpperCase())} Stories`}
                    />
                )}
            </div>
        </>
    );
};

export default Genre;

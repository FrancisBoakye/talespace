import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
    const formatReads = (reads) => {
        if (reads >= 1000000) {
            return `${(reads / 1000000).toFixed(1)}M`;
        } else if (reads >= 1000) {
            return `${(reads / 1000).toFixed(1)}K`;
        }
        return reads.toString();
    };

    return (
        <div className="book-card">
            <Link to={`/book/${book.slug}`} className="book-link">
                <div className="book-cover">
                    <img
                        src={book.coverImageUrl}
                        alt={book.title}
                        className="book-image"
                        loading="lazy"
                    />
                    <div className="book-overlay">
                        <span className="read-button">Read Now</span>
                    </div>
                </div>

                <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    <div className="book-stats">
                        <span className="book-category">{book.category}</span>
                        <span className="book-reads">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                            {formatReads(book.totalRead || 0)}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BookCard;

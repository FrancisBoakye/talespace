import React from 'react';
import BookCard from '../BookCard/BookCard';
import './BookshelfGrid.css';

const BookshelfGrid = ({ books, title = "Featured Stories" }) => {
    return (
        <section className="bookshelf-section">
            <div className="bookshelf-container">
                <h2 className="bookshelf-title">{title}</h2>

                {books.length === 0 ? (
                    <div className="no-books">
                        <p>No stories found.</p>
                    </div>
                ) : (
                    <div className="bookshelf-grid">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BookshelfGrid;

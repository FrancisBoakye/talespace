import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import Comments from '../components/Comments/Comments';
import { getBookBySlug, incrementTotalReads } from '../firebase/bookService';
import './BookReader.css';

const BookReader = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showShareMenu, setShowShareMenu] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            if (!slug) {
                setError('Book not found');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const fetchedBook = await getBookBySlug(slug);

                if (fetchedBook) {
                    setBook(fetchedBook);
                    // Increment read count
                    await incrementTotalReads(fetchedBook.id);
                } else {
                    setError('Book not found');
                }
            } catch (err) {
                setError('Failed to load book');
                console.error('Error fetching book:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [slug]);

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = book?.title || 'Check out this story';

        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
                return;
            default:
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }

        setShowShareMenu(false);
    };

    if (loading) {
        return (
            <div className="book-reader">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading your story...</p>
                </div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="book-reader">
                <div className="error-container">
                    <h2>Story Not Found</h2>
                    <p>{error || 'The story you\'re looking for doesn\'t exist.'}</p>
                    <button onClick={() => navigate('/')} className="back-button">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={`${book.title} - TaleSpace`}
                description={`Read "${book.title}" by ${book.author}. ${book.category} story available for free on TaleSpace.`}
                keywords={`${book.title}, ${book.author}, ${book.category}, free story, free book, online reading`}
                image={book.coverImageUrl}
                url={window.location.href}
                type="article"
            />

            <div className="book-reader">
                <div className="book-header">
                    <button onClick={() => navigate('/')} className="back-button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 12H5m0 0l7 7m-7-7l7-7" />
                        </svg>
                        Back to Stories
                    </button>

                    <div className="book-actions">
                        <div className="share-container">
                            <button
                                onClick={() => setShowShareMenu(!showShareMenu)}
                                className="share-button"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                                </svg>
                                Share
                            </button>

                            {showShareMenu && (
                                <div className="share-menu">
                                    <button onClick={() => handleShare('facebook')}>
                                        Facebook
                                    </button>
                                    <button onClick={() => handleShare('twitter')}>
                                        Twitter
                                    </button>
                                    <button onClick={() => handleShare('copy')}>
                                        Copy Link
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="book-content">
                    <div className="book-meta">
                        <div className="book-cover-small">
                            <img src={book.coverImageUrl} alt={book.title} />
                        </div>
                        <div className="book-details">
                            <h1 className="book-title">{book.title}</h1>
                            <p className="book-author">by {book.author}</p>
                            <div className="book-info">
                                <span className="book-category">{book.category}</span>
                                <span className="book-reads">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                    </svg>
                                    {(book.totalRead || 0).toLocaleString()} reads
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="story-content">
                        <div
                            className="story-text"
                            dangerouslySetInnerHTML={{ __html: book.content }}
                        />
                    </div>
                </div>

                <Comments bookId={book.id} />
            </div>
        </>
    );
};

export default BookReader;

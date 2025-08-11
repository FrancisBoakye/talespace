import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { addComment, getCommentsByBookId, deleteComment } from '../../firebase/commentService';
import { Link } from 'react-router-dom';
import './Comments.css';

const Comments = ({ bookId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    useEffect(() => {
        loadComments();
    }, [bookId]);

    const loadComments = async () => {
        setLoading(true);
        const result = await getCommentsByBookId(bookId);
        if (result.success) {
            setComments(result.comments);
        }
        setLoading(false);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setSubmitting(true);
        setError('');

        const result = await addComment(
            bookId,
            currentUser.uid,
            currentUser.displayName || 'Anonymous User',
            newComment.trim()
        );

        if (result.success) {
            setNewComment('');
            loadComments(); // Reload comments to show the new one
        } else {
            setError(result.error);
        }

        setSubmitting(false);
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            const result = await deleteComment(commentId, currentUser.uid);
            if (result.success) {
                loadComments(); // Reload comments to reflect deletion
            }
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="comments-section">
            <h3 className="comments-title">
                Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            {currentUser ? (
                <form onSubmit={handleSubmitComment} className="comment-form">
                    {error && <div className="error-message">{error}</div>}
                    <div className="comment-input-group">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts about this story..."
                            className="comment-textarea"
                            rows={3}
                            maxLength={500}
                            disabled={submitting}
                        />
                        <div className="comment-form-footer">
                            <span className="character-count">
                                {newComment.length}/500
                            </span>
                            <button
                                type="submit"
                                className="comment-submit-btn"
                                disabled={submitting || !newComment.trim()}
                            >
                                {submitting ? 'Posting...' : 'Post Comment'}
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="auth-prompt">
                    <p>
                        <Link to="/login" className="auth-link">Sign in</Link> or{' '}
                        <Link to="/register" className="auth-link">create an account</Link> to join the conversation.
                    </p>
                </div>
            )}

            {/* Comments List */}
            <div className="comments-list">
                {loading ? (
                    <div className="loading-message">Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className="no-comments">
                        No comments yet. Be the first to share your thoughts!
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <div className="comment-header">
                                <span className="comment-author">{comment.userName}</span>
                                <span className="comment-date">{formatDate(comment.createdAt)}</span>
                                {currentUser && currentUser.uid === comment.userId && (
                                    <button
                                        onClick={() => handleDeleteComment(comment.id)}
                                        className="delete-comment-btn"
                                        aria-label="Delete comment"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                            <div className="comment-content">
                                {comment.content}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Comments;

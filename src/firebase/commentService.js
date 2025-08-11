import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  serverTimestamp,
  deleteDoc,
  doc 
} from 'firebase/firestore';
import { db } from './config';

// Add a comment to a story
export const addComment = async (bookId, userId, userName, content) => {
  try {
    const commentData = {
      bookId,
      userId,
      userName,
      content,
      createdAt: serverTimestamp(),
      isDeleted: false
    };

    const docRef = await addDoc(collection(db, 'comments'), commentData);
    return { success: true, commentId: docRef.id };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false, error: error.message };
  }
};

// Get all comments for a specific book
export const getCommentsByBookId = async (bookId) => {
  try {
    const q = query(
      collection(db, 'comments'),
      where('bookId', '==', bookId),
      where('isDeleted', '==', false),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const comments = [];
    
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return { success: true, comments };
  } catch (error) {
    console.error('Error getting comments:', error);
    return { success: false, error: error.message };
  }
};

// Delete a comment (soft delete)
export const deleteComment = async (commentId, userId) => {
  try {
    const commentRef = doc(db, 'comments', commentId);
    await deleteDoc(commentRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false, error: error.message };
  }
};

// Get total comment count for a book
export const getCommentCount = async (bookId) => {
  try {
    const q = query(
      collection(db, 'comments'),
      where('bookId', '==', bookId),
      where('isDeleted', '==', false)
    );

    const querySnapshot = await getDocs(q);
    return { success: true, count: querySnapshot.size };
  } catch (error) {
    console.error('Error getting comment count:', error);
    return { success: false, error: error.message };
  }
};

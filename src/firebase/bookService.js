import { collection, getDocs, doc, getDoc, query, where, orderBy, limit, increment, updateDoc } from 'firebase/firestore';
import { db } from './config';

// Get all published books
export const getPublishedBooks = async () => {
  try {
    const booksRef = collection(db, 'books');
    const q = query(
      booksRef,
      where('isDraft', '==', false),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

// Get books by category
export const getBooksByCategory = async (category) => {
  try {
    const booksRef = collection(db, 'books');
    const q = query(
      booksRef,
      where('isDraft', '==', false),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching books by category:', error);
    return [];
  }
};

// Get single book by slug
export const getBookBySlug = async (slug) => {
  try {
    const booksRef = collection(db, 'books');
    const q = query(booksRef, where('slug', '==', slug), where('isDraft', '==', false));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching book by slug:', error);
    return null;
  }
};

// Increment total reads
export const incrementTotalReads = async (bookId) => {
  try {
    const bookRef = doc(db, 'books', bookId);
    await updateDoc(bookRef, {
      totalRead: increment(1)
    });
  } catch (error) {
    console.error('Error incrementing total reads:', error);
  }
};

// Search books by title or content
export const searchBooks = async (searchTerm) => {
  try {
    const booksRef = collection(db, 'books');
    const q = query(
      booksRef,
      where('isDraft', '==', false),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const allBooks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filter books based on search term (title or content)
    const searchTermLower = searchTerm.toLowerCase();
    return allBooks.filter(book => 
      book.title.toLowerCase().includes(searchTermLower) ||
      book.content.toLowerCase().includes(searchTermLower) ||
      (book.author && book.author.toLowerCase().includes(searchTermLower))
    );
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

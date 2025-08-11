# Firebase Setup Instructions for TaleSpace

## Prerequisites
1. A Google account
2. Access to Firebase Console (https://console.firebase.google.com)

## Step 1: Create a Firebase Project
1. Go to the Firebase Console
2. Click "Create a project"
3. Enter project name: "talespace" (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set up Firestore Database
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select your preferred location
5. Click "Done"

## Step 3: Create the Books Collection
1. In Firestore, click "Start collection"
2. Collection ID: `books`
3. Add a sample document with these fields:

```json
{
  "author": "Jane Doe",
  "category": "fantasy",
  "content": "<h1>Chapter 1</h1><p>Once upon a time in a magical land...</p>",
  "coverImageUrl": "https://example.com/book-cover.jpg",
  "createdAt": "2024-01-01T00:00:00Z",
  "isDraft": false,
  "slug": "magical-adventure",
  "title": "The Magical Adventure",
  "totalRead": 1250,
  "totalShares": 45
}
```

## Step 4: Set up Firestore Security Rules
Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to published books
    match /books/{bookId} {
      allow read: if resource.data.isDraft == false;
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

## Step 5: Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and choose Web
4. Register your app with nickname "TaleSpace Web"
5. Copy the config object

## Step 6: Update Firebase Config in Your Project
1. Open `src/firebase/config.js`
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 7: (Optional) Set up Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize hosting: `firebase init hosting`
4. Build your app: `npm run build`
5. Deploy: `firebase deploy`

## Sample Book Documents
Add these sample books to test your application:

### Book 1: Fantasy
```json
{
  "author": "Alex Morgan",
  "category": "fantasy",
  "content": "<h1>The Lost Kingdom</h1><p>In the ancient realm of Eldoria, where magic flows through every living thing, a young adventurer discovers a hidden prophecy that could change the fate of all kingdoms...</p><p>The journey begins in the small village of Thornhaven, where strange occurrences have been reported. Villagers speak of glowing lights in the forest and whispers of an ancient power awakening.</p>",
  "coverImageUrl": "https://picsum.photos/300/400?random=1",
  "createdAt": "2024-01-15T10:30:00Z",
  "isDraft": false,
  "slug": "the-lost-kingdom",
  "title": "The Lost Kingdom",
  "totalRead": 2847,
  "totalShares": 156
}
```

### Book 2: Romance
```json
{
  "author": "Sarah Williams",
  "category": "romance",
  "content": "<h1>Love in the City</h1><p>When successful architect Emma Carter moves to New York City for a dream job, she never expects to fall for the charming coffee shop owner next door...</p><p>Their first meeting is anything but romantic - Emma accidentally spills her latte all over David's laptop. But sometimes the best love stories start with the worst first impressions.</p>",
  "coverImageUrl": "https://picsum.photos/300/400?random=2",
  "createdAt": "2024-01-20T14:15:00Z",
  "isDraft": false,
  "slug": "love-in-the-city",
  "title": "Love in the City",
  "totalRead": 1923,
  "totalShares": 89
}
```

### Book 3: Mystery
```json
{
  "author": "Detective Mike Ross",
  "category": "mystery",
  "content": "<h1>The Vanishing Act</h1><p>When renowned magician Victor Delacroix disappears during his most famous trick, Detective Sarah Chen must unravel a web of secrets, lies, and illusions to find the truth...</p><p>The theater was packed that night. Everyone saw Victor enter the locked box, but when it was opened moments later, he was gone. No trap doors, no hidden passages - just an impossible disappearance.</p>",
  "coverImageUrl": "https://picsum.photos/300/400?random=3",
  "createdAt": "2024-01-25T09:45:00Z",
  "isDraft": false,
  "slug": "the-vanishing-act",
  "title": "The Vanishing Act",
  "totalRead": 3156,
  "totalShares": 203
}
```

## Firestore Indexes
For better performance, create these composite indexes in Firestore:

1. **Collection**: `books`
   - Fields: `isDraft` (Ascending), `category` (Ascending), `createdAt` (Descending)
   
2. **Collection**: `books`
   - Fields: `isDraft` (Ascending), `createdAt` (Descending)

## Environment Variables (Optional)
For production, consider using environment variables:

1. Create `.env` file in project root:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

2. Update `config.js` to use environment variables:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Testing Your Setup
1. Start your development server: `npm run dev`
2. Open your browser and navigate to the local development URL
3. You should see your sample books displayed on the homepage
4. Test navigation between pages
5. Click on a book to test the reader functionality

Your TaleSpace website is now ready with Firebase integration!

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import AllStories from './pages/AllStories';
import Genre from './pages/Genre';
import About from './pages/About';
import BookReader from './pages/BookReader';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all-stories" element={<AllStories />} />
              <Route path="/genre" element={<Genre />} />
              <Route path="/about" element={<About />} />
              <Route path="/book/:slug" element={<BookReader />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

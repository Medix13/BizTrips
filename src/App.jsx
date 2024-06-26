import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripList from './components/TripList';
import TripDetails from './components/TripDetails';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="header-shadow">
        <Header />
      </div>

      {/* Main content */}
      <main className="flex-1">
        <Router>
          <Routes>
            <Route path="/" element={<TripList />} />
            <Route path="/trip/:id" element={<TripDetails />} />
          </Routes>
        </Router>
      </main>
      <Footer />
    </div>
  );
};

export default App;

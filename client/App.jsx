import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import Explorer from './pages/public/Explorer';
import MapPage from './pages/public/MapPage';
import DetailsPage from './pages/public/DetailsPage';
import BorderInfo from './pages/public/BorderInfo';
import Postulate from './pages/public/Postulate';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import './index.css';

import PublicLayout from './components/layout/PublicLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - Wrapped in PublicLayout */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/explorer" element={<PublicLayout><Explorer /></PublicLayout>} />
        <Route path="/map" element={<PublicLayout><MapPage /></PublicLayout>} />
        <Route path="/details/:id" element={<PublicLayout><DetailsPage /></PublicLayout>} />
        <Route path="/border-info" element={<PublicLayout><BorderInfo /></PublicLayout>} />
        <Route path="/postulate" element={<PublicLayout><Postulate /></PublicLayout>} />

        {/* Admin Routes - Maintain dedicated layout if needed later */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
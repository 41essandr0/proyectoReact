import React from 'react';
// App.jsx (main component)
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminCatalog from './components/AdminCatalog';
import MainPage from './components/MainPage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import GameDetails from './components/GameDetails';
import ResetPassword from './components/ResetPassword'
import News from './components/news';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/AdminCatalog" element={<AdminCatalog />} />
        <Route path="/registrate" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/gmaes/:id" element={<GameDetails />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;

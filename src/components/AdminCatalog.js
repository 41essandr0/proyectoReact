// AdminCatalog.jsx
import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../api/gamesApi';

const AdminCatalog = () => {
  // Basic state management for reading only
  const [games, setGames] = useState([]);

  // Fetch games when component loads
  useEffect(() => {
    const loadGames = async () => {
      try {
        const gamesData = await getGames();
        setGames(gamesData);
      } catch (error) {
        console.error("Error loading games:", error);
      }
    };
    
    loadGames();
  }, []); // Empty dependency array = runs once on mount

  return (
    <div className="container-fluid p-0">
      {/* Header with Logo and Store Name */}
      <header className="bg-dark text-white p-3">
        <div className="container d-flex align-items-center justify-content-center">
          <img 
            src="/logo.png" 
            alt="GameStore Logo" 
            style={{ height: '50px', marginRight: '15px' }}
          />
          <h1 className="mb-0">GameStore</h1>
        </div>
      </header>
      <br></br>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center mb-4">
        <div className="navbar-nav">
          <button className="nav-link btn btn-link">Añadir juego</button>
          <button className="nav-link btn btn-link">Editar juego</button>
          <button className="nav-link btn btn-link">Eliminar juego</button>
          <Link to="/news" className="nav-link btn btn-link">
            Noticias
          </Link>
        </div>
      </nav>

      {/* Games List */}
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
        {games.map((game) => (
            <div key={game.id} className="col">
              <div className="card h-100">
                <div className="card-img-top bg-secondary" style={{ height: '200px' }} />
                <div className="card-body">
                  <h5 className="card-title">{game.title}</h5>
                  <p className="card-text text-muted mb-2">{game.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-muted">Precio: {game.price}</p>
                    <span className="badge bg-primary">{game.genre}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet"></link>
    </div>
  );
};

export default AdminCatalog;
import { useEffect, useState } from 'react';
import { useLocation ,useParams, useNavigate } from 'react-router-dom';
import { getGames } from '../api/gamesApi';

const GameDetails = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(state?.game || null);
    const [loading, setLoading] = useState(!state?.game);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchGameData = async () => {
        try {
          // If we didn't receive state, fetch from API
          if (!state?.game) {
            const response = await fetch('/db.json');
            const data = await response.json();
            const numericId = parseInt(id, 10);
            const foundGame = data.games.find(g => g.id === numericId);
            
            if (!foundGame) {
              navigate('/not-found');
              return;
            }
            
            setGame(foundGame);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (!game) {
        fetchGameData();
      }
    }, [id, state, game, navigate]);

  return (
    <div className="container mt-4">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>
      <h1 className="mb-4">{game.title}</h1>
      
      {/* Basic Information */}
      <div className="row mb-4">
        <div className="col-md-8">
          <p className="lead">{game.description}</p>
          <div className="d-flex gap-3">
            <span className="badge bg-primary">Precio: ${game.price}</span>
            <span className="badge bg-success">Género: {game.genre}</span>
          </div>
        </div>
      </div>

      {/* Trailer Placeholder */}
      <div className="mb-5">
        <h3>Tráiler</h3>
        <div className="ratio ratio-16x9 bg-secondary d-flex align-items-center justify-content-center">
          <i className="bi bi-film fs-1 text-light"></i>
        </div>
      </div>

      {/* Photos Placeholder */}
      <div className="mb-5">
        <h3>Imágenes del Juego</h3>
        <div className="row g-3">
          {[1, 2, 3].map((num) => (
            <div className="col-md-4" key={num}>
              <div className="bg-light border rounded p-2">
                <div 
                  className="img-placeholder" 
                  style={{
                    height: '200px',
                    backgroundColor: '#dee2e6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span className="text-muted">Imagen {num}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-top pt-4">
        <h3>Valoraciones</h3>
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="stars text-warning">
            {[...Array(5)].map((_, i) => (
              <i key={i} className="bi bi-star"></i>
            ))}
          </div>
          <span className="text-muted">0 reseñas</span>
        </div>
        
        <div className="alert alert-info">
          Aún no hay reseñas para este juego. ¡Sé el primero en opinar!
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
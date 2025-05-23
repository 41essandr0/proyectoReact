import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getGames } from '../api/gamesApi';

const MainPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Cart functions
  const getCart = () => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  };

  const setCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // Add to cart handler
  const handleAddToCart = (gameId) => {
    const game = games.find(g => g.id === gameId);
    if (!game) {
      alert("Juego no encontrado.");
      return;
    }

    const cart = getCart();
    const alreadyInCart = cart.some(item => item.id === game.id);

    if (alreadyInCart) {
      alert(`${game.title} ya está en el carrito.`);
    } else {
      cart.push({ id: game.id, title: game.title });
      setCart(cart);
      alert(`${game.title} agregado al carrito.`);
    }
  };

  if (loading) return <div>Cargando juegos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-light text-dark">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <img 
            className="logo" 
            src="/logo.png" 
            alt="GameStore" 
            width="45" 
            height="35"
            style={{ marginRight: '10px' }}
          />
          <a className="navbar-brand" href="#">Game Store</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Catálogo</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Configuración</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Más vendidos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Mejor valorados</a>
              </li>
            </ul>
            
            <div className="d-flex align-items-center">
            <Link to="/login" className="text-info me-3">
                Iniciar Sesión
            </Link>
              <form className="d-flex">
                <div className="input-group">
                  <input 
                    type="search" 
                    className="form-control" 
                    placeholder="Buscar juego..." 
                  />
                  <button className="btn btn-outline-light" type="button">
                    Buscar
                  </button>
                </div>
                <a 
                  href="#" 
                  className="btn btn-outline-success ms-2"
                  role="button"
                >
                  Carrito
                </a>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Carrusel - Using placeholder images */}
      <div id="carousel" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-block w-100" style={{ height: '300px', backgroundColor: '#6c757d' }} />
          </div>
          <div className="carousel-item">
            <div className="d-block w-100" style={{ height: '300px', backgroundColor: '#6c757d' }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <br/>
      
      <section>
        <div class="album pt-1">
            <div class="container">
                <div class="filtros">
                    <div class="form-group mb-3">
                        <label class="form-label">Precio:</label>
                        <select class="form-select" name="price" id="price">
                            <option value="">Seleccione</option>
                            <option value="precios1">S/39 - S/49</option>
                            <option value="precios2">S/49 - S/59</option>
                            <option value="precios3">S/59 - S/69</option>
                        </select>
                    </div>
                    <div class="form-group mb-3">
                        <label class="form-label">Categoria:</label>
                        <select class="form-select" name="categorie" id="categorie">
                            <option value="">Seleccione</option>
                            <option value="Accion">Acción</option>
                            <option value="Aventura">Aventura</option>
                            <option value="Carreras">Carreras</option>
                        </select>
                    </div>
                    <div class="form-group mb-3">
                        <label class="form-label">Solo Ofertas:</label>
                        <select class="form-select" name="sales" id="sales">
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                    <div class="form-group mb-3">
                        <label class="form-label">Plataforma:</label>
                        <select class="form-select" name="platform" id="platform">
                            <option value="">Seleccione</option>
                            <option value="PS4">PS4</option>
                            <option value="PS5">PS5</option>
                            <option value="Swtich">Switch</option>
                            <option value="Windows">Windows</option>
                            <option value="MacOS">MacOS</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    </section>


      <section id="recientes" className="py-5">
        <div className="container">
          <h2>Los 10 juegos más recientes</h2>
          <div className="row">
            {games.slice(0, 10).map((game, index) => (
              <div className={`col-md-3 ${index < 5 ? 'py-3' : 'py-1'}`} key={game.id}>
                <Link 
                to={`/games/${game.id}`}
                state={{ game }} // Pass the entire game object via state
                className="text-decoration-none text-dark"
                >
                <div 
                  className="card" 
                  style={{ 
                    width: '14rem', 
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/games/${game.id}`, { state: { game } })}
                >
                  {/* Card image placeholder */}
                  <div className="card-img-top" style={{ 
                    height: '200px', 
                    backgroundColor: '#dee2e6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span className="text-muted">Imagen del juego</span>
                  </div>
                
                  <div className="card-body">
                    <h5 className="card-title">{game.title}</h5>
                    <button 
                      className="btn btn-sm btn-success w-50" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(game.id);
                      }}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
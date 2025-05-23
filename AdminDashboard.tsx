import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { NewsContext, NewsArticle } from '../context/NewsContext';
import { games as allGames, Game } from '../data/games';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  datasets: [
    {
      label: 'Ganancias ($)',
      data: [1200, 1500, 1800, 2000, 1700, 2100, 2500, 2300, 2200, 2400, 2600, 3000],
      backgroundColor: 'rgba(54, 162, 235, 0.7)'
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Ganancias por mes (2024)' }
  }
};


const AdminDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { news } = useContext(NewsContext);
  const [isGamesPanel, setIsGamesPanel] = useState(true);
  const [showAddGameForm, setShowAddGameForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showEditGameForm, setShowEditGameForm] = useState(false);
  const [showEditSuccessMessage, setShowEditSuccessMessage] = useState(false);
  const [showDeleteGameForm, setShowDeleteGameForm] = useState(false);
  const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState(false);
  const [showDeleteNewsForm, setShowDeleteNewsForm] = useState(false);
  const [showDeleteNewsSuccess, setShowDeleteNewsSuccess] = useState(false);
  const [showEditNewsForm, setShowEditNewsForm] = useState(false);
  const [showEditNewsSuccess, setShowEditNewsSuccess] = useState(false);
  const [showAddNewsForm, setShowAddNewsForm] = useState(false);
  const [showAddNewsSuccess, setShowAddNewsSuccess] = useState(false);

  const handleFakeAddNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddNewsForm(false);
    setShowAddNewsSuccess(true);
  };

  useEffect(() => {
    if (showAddNewsSuccess) {
      const timer = setTimeout(() => setShowAddNewsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAddNewsSuccess]);

  const handleFakeEditNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEditNewsForm(false);
    setShowEditNewsSuccess(true);
  };

  useEffect(() => {
    if (showEditNewsSuccess) {
      const timer = setTimeout(() => setShowEditNewsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showEditNewsSuccess]);
  
  const handleFakeDeleteNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDeleteNewsForm(false);
    setShowDeleteNewsSuccess(true);
  };
  
    useEffect(() => {
      if (showDeleteNewsSuccess) {
        const timer = setTimeout(() => setShowDeleteNewsSuccess(false), 3000);
        return () => clearTimeout(timer);
      }
    }, [showDeleteNewsSuccess]);

  const handleFakeDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDeleteGameForm(false);
    setShowDeleteSuccessMessage(true);
  };

  useEffect(() => {
    if (showDeleteSuccessMessage) {
      const timer = setTimeout(() => setShowDeleteSuccessMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showDeleteSuccessMessage]);

  const handleFakeEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEditGameForm(false);
    setShowEditSuccessMessage(true);
  };

  useEffect(() => {
    if (showEditSuccessMessage) {
      const timer = setTimeout(() => setShowEditSuccessMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showEditSuccessMessage]);

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddGameForm(false);
    setShowSuccessMessage(true);
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);
  /*if (!user || user.role !== 'admin') {
    return <div className="container mt-5"><h3>No autorizado</h3></div>;
  }*/
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Panel de Administrador</h2>
      <div className='panel' style={{ maxWidth: 700, margin: '0 auto' }}>
        <Bar data={data} options={options} />
      </div>

      {showAddNewsSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ¡Noticia añadida exitosamente! (Simulación)
          <button type="button" className="btn-close" onClick={() => setShowAddNewsSuccess(false)}></button>
        </div>
      )}

      {showAddNewsForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="card p-4" style={{ width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 className="mb-4">Añadir Noticia</h3>
            <form onSubmit={handleFakeAddNewsSubmit}>
              <div className="mb-3">
                <label className="form-label">Título de la noticia</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Ej: Nuevo lanzamiento exclusivo" 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea 
                  className="form-control" 
                  rows={4} 
                  placeholder="Contenido de la noticia..." 
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Imagen de portada</label>
                <input 
                  type="file" 
                  className="form-control" 
                  accept=".jpg, .png" 
                  required 
                />
                <small className="text-muted">Formatos permitidos: .jpg, .png</small>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowAddNewsForm(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">Publicar Noticia</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditNewsSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ¡Noticia editada exitosamente! (Simulación)
          <button type="button" className="btn-close" onClick={() => setShowEditNewsSuccess(false)}></button>
        </div>
      )}

      {showEditNewsForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="card p-4" style={{ width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 className="mb-4">Editar Noticia</h3>
            <form onSubmit={handleFakeEditNewsSubmit}>
              <div className="mb-3">
                <label className="form-label">Seleccionar noticia</label>
                <select className="form-select" required>
                  <option value="">Seleccione una noticia</option>
                  {news.map(article => (
                    <option key={article.id} value={article.id}>{article.title}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Nuevo título</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Nuevo título de la noticia" 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nuevo contenido</label>
                <textarea 
                  className="form-control" 
                  rows={4} 
                  placeholder="Nuevo contenido de la noticia" 
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Nueva imagen (opcional)</label>
                <input 
                  type="file" 
                  className="form-control" 
                  accept=".jpg, .png" 
                />
                <small className="text-muted">Formatos permitidos: .jpg, .png</small>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowEditNewsForm(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteNewsSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ¡Noticia eliminada exitosamente! (Simulación)
          <button type="button" className="btn-close" onClick={() => setShowDeleteNewsSuccess(false)}></button>
        </div>
      )}

      {showDeleteNewsForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="card p-4" style={{ width: '90%', maxWidth: '600px' }}>
            <h3 className="mb-4">Eliminar Noticia</h3>
            <form onSubmit={handleFakeDeleteNewsSubmit}>
              <div className="mb-4">
                <label className="form-label">Seleccionar noticia a eliminar</label>
                <select className="form-select" required>
                  <option value="">Seleccione una noticia</option>
                  {news.map(article => (
                    <option key={article.id} value={article.id}>{article.title}</option>
                  ))}
                </select>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteNewsForm(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-danger">Eliminar Noticia</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ¡Juego agregado exitosamente!
          <button type="button" className="btn-close" onClick={() => setShowSuccessMessage(false)}></button>
        </div>
        )
      }

      {showAddGameForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="card p-4" style={{ width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
          <h3 className="mb-4">Añadir Juego</h3>
          <form onSubmit={handleFakeSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del juego</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Ej: The Last of Us" 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input 
                type="number" 
                className="form-control" 
                step="0.01" 
                min="0" 
                placeholder="Ej: 59.99" 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Géneros</label>
              <select 
                multiple 
                className="form-select" 
                size={3}
                style={{ height: 'auto' }}
              >
                {['Carreras', 'Simulación', 'Acción', 'Aventura', 'RPG', 'Drama', 'Mitología', 'Mundo abierto', 'Supervivencia', 'Misterio'].map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <small className="text-muted">Mantén presionado Ctrl para seleccionar múltiples</small>
            </div>

            <div className="mb-3">
              <label className="form-label">Plataformas</label>
              <div className="d-flex gap-3">
                {['PS5', 'PS4', 'PC'].map(platform => (
                  <div key={platform} className="form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id={platform} 
                    />
                    <label className="form-check-label" htmlFor={platform}>
                      {platform}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Portada del juego</label>
              <input 
                type="file" 
                className="form-control" 
                accept=".jpg, .png" 
                required 
              />
            </div>

            <div className="d-flex gap-2 justify-content-end mt-4">
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddGameForm(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">Agregar Juego</button>
            </div>
          </form>
        </div>
      </div>
    )}

    {showEditSuccessMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ¡Juego editado exitosamente!
          <button type="button" className="btn-close" onClick={() => setShowEditSuccessMessage(false)}></button>
        </div>
    )}

    {showEditGameForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="card p-4" style={{ width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 className="mb-4">Editar Juego</h3>
            <form onSubmit={handleFakeEditSubmit}>
              <div className="mb-3">
                <label className="form-label">Seleccionar juego</label>
                <select className="form-select" required>
                  <option value="">Seleccione un juego</option>
                  {allGames.map(game => (
                    <option key={game.id} value={game.id}>{game.title}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Nuevo precio</label>
                <input 
                  type="number" 
                  className="form-control" 
                  step="0.01" 
                  min="0" 
                  placeholder="Ej: 49.99" 
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Descuento (%)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  min="0" 
                  max="100" 
                  placeholder="Ej: 30" 
                />
              </div>

              <div className="d-flex gap-2 justify-content-end mt-4">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowEditGameForm(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteSuccessMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ¡Juego eliminado exitosamente!
          <button type="button" className="btn-close" onClick={() => setShowDeleteSuccessMessage(false)}></button>
        </div>
      )}

      {showDeleteGameForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="card p-4" style={{ width: '90%', maxWidth: '600px' }}>
            <h3 className="mb-4">Eliminar Juego</h3>
            <form onSubmit={handleFakeDeleteSubmit}>
              <div className="mb-4">
                <label className="form-label">Seleccionar juego a eliminar</label>
                <select className="form-select" required>
                  <option value="">Seleccione un juego</option>
                  {allGames.map(game => (
                    <option key={game.id} value={game.id}>{game.title}</option>
                  ))}
                </select>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteGameForm(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-danger">Eliminar Juego</button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      <div className="mt-4 d-flex gap-2 justify-content-center">
        <button 
          className={`btn ${isGamesPanel ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setIsGamesPanel(true)}
        >
          Administrar juegos
        </button>
        <button 
          className={`btn ${!isGamesPanel ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setIsGamesPanel(false)}
        >
          Administrar noticias
        </button>
      </div>
  
      {isGamesPanel ? (
        <div className="mt-3">
          <div className="d-flex gap-2 mb-3 justify-content-center">
            <button className="btn btn-success"
              onClick={() => setShowAddGameForm(true)}>Añadir juego</button>
            <button className="btn btn-warning" onClick={() => setShowEditGameForm(true)}>Editar juego</button>
            <button className="btn btn-danger" onClick={() => setShowDeleteGameForm(true)}>Eliminar juego</button>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {allGames.map((game) => (
              <div key={game.id} className="col">
                <div className="card h-100">
                  <img src={game.image} className="card-img-top" alt={game.title} style={{ height: '200px', objectFit: 'cover' }}/>
                  <div className="card-body">
                    <h5 className="card-title">{game.title}</h5>
                    <p className="card-text">${game.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
      <div className="mt-3">
        <div className="d-flex gap-2 mb-3 justify-content-center">
          <button className="btn btn-success" onClick={() => setShowAddNewsForm(true)}>Añadir noticia</button>
          <button className="btn btn-warning" onClick={() => setShowEditNewsForm(true)}>Editar noticia</button>
          <button className="btn btn-danger" onClick={() => setShowDeleteNewsForm(true)}>Eliminar noticia</button>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {news.map((article) => (
            <div key={article.id} className="col">
              <div className="card h-100">
                {article.image && (
                  <img src={article.image} className="card-img-top" alt={article.title} style={{ height: '200px', objectFit: 'cover' }}/>
                )}
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.body.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
};
  
export default AdminDashboard;
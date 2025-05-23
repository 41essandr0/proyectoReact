import React, { useContext, useState } from 'react';
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

/*if (!user || user.role !== 'admin') {
    return <div className="container mt-5"><h3>No autorizado</h3></div>;
  }*/

const AdminDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { news } = useContext(NewsContext);
  const [isGamesPanel, setIsGamesPanel] = useState(true);
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Panel de Administrador</h2>
      <div className='panel' style={{ maxWidth: 700, margin: '0 auto' }}>
        <Bar data={data} options={options} />
      </div>
  
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
            <button className="btn btn-success">Añadir juego</button>
            <button className="btn btn-warning">Editar juego</button>
            <button className="btn btn-danger">Eliminar juego</button>
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
          <button className="btn btn-success">Añadir noticia</button>
          <button className="btn btn-warning">Editar noticia</button>
          <button className="btn btn-danger">Eliminar noticia</button>
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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultNews = [
  {
    title: "GTA VI será lanzado en 2025",
    content: "Rockstar Games confirmó oficialmente el lanzamiento de Grand Theft Auto VI.",
    image: '/images/gta6.jpg'
  },
  {
    title: "Spider-Man 2 rompe récords",
    content: "Más de 5 millones de copias en la primera semana.",
    image: '/images/spidy.jpg'
  },
  {
    title: "Nuevo avance de God of War",
    content: "Sony muestra nuevo contenido de God of War en el State of Play.",
    image: '/images/godofwar.png'
  }
];

const News = () => {
  const [news, setNews] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const storedNews = JSON.parse(localStorage.getItem("news"));
    
    if (user && user.role === "admin") {
      setIsAdmin(true);
    }

    if (!storedNews || !Array.isArray(storedNews) || storedNews.length === 0) {
      localStorage.setItem("news", JSON.stringify(defaultNews));
      setNews(defaultNews);
    } else {
      setNews(storedNews);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNews = [...news, {
      ...formData,
      image: formData.image || '/images/default-news.jpg' // Add a default image path if needed
    }];
    setNews(newNews);
    localStorage.setItem("news", JSON.stringify(newNews));
    setFormData({ title: '', content: '', image: '' });
  };

  const deleteNews = (index) => {
    const updatedNews = news.filter((_, i) => i !== index);
    setNews(updatedNews);
    localStorage.setItem("news", JSON.stringify(updatedNews));
  };

  return (
    <div className="container py-5">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
      <h1 className="mb-4">📰 Noticias de Videojuegos</h1>
      <div className="mb-4">
          <button 
            onClick={() => navigate('/adminCatalog')}
            className="btn btn-secondary"
          >
            Volver al Catálogo de Administrador
          </button>
        </div>

      <div id="news-list">
        {news.map((item, index) => (
          <div key={index} className="news-card mb-4 p-3 border rounded">
            <h4>{item.title}</h4>
            {item.image && (
              <img 
                src={process.env.PUBLIC_URL + item.image} 
                alt={item.title} 
                className="img-fluid mb-3"
                style={{ maxWidth: '300px' }}
              />
            )}
            <p>{item.content}</p>
            {isAdmin && (
              <button 
                className="btn btn-sm btn-danger mt-2"
                onClick={() => deleteNews(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="mt-4">
          <h3>Agregar Noticia</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Título"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Contenido"
                rows="3"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ruta de imagen (opcional)"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Publicar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default News;
import React, { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [sentEmail, setSentEmail] = useState('');
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
  
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
  
      if (!formData.name || !formData.email || !formData.password) {
        setError('All fields are required');
        return;
      }
  
      // Simulate email sending
      setSentEmail(formData.email);
      setSuccess(true);
    };
  
    return (
      <div className="container mt-5">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-white text-center">
                <img 
                  src="../logo.png" 
                  alt="App Logo" 
                  className="mb-3" 
                  style={{ height: '50px' }}
                />
                <h3>Crear Cuenta</h3>
              </div>
              
              <div className="card-body">
                {success ? (
                  <div className="alert alert-success">
                    <h4>¡Registro exitoso!</h4>
                    <p className="mt-3">
                      Un email de confirmación ha sido enviado a:<br />
                      <strong>{sentEmail}</strong>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre completo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                    Registrarse
                    </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
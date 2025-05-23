import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userEmailError, setUserEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate(); // Initialize navigate
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let isValid = true;
  
      // Validate user email
      if (!userEmail.trim()) {
        setUserEmailError('El usuario o correo electrónico es obligatorio.');
        isValid = false;
      } else {
        setUserEmailError('');
      }
  
      // Validate password
      if (!password.trim()) {
        setPasswordError('La contraseña es obligatoria.');
        isValid = false;
      } else {
        setPasswordError('');
      }
  
      if (isValid) {
        alert('Sesión Iniciada');
        setUserEmail('');
        setPassword('');
        setUserEmailError('');
        setPasswordError('');
        
        // Check for admin email pattern
        if (userEmail.includes('@admin')) {
          navigate('/adminCatalog');
        } else {
          navigate('/');
        }
      }
    };

  return (
    <div className="bg-dark d-flex justify-content-center align-items-center vh-100">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
      <div className="py-5">
        <div className="bg-light p-5 rounded-5 text-secondary" style={{ width: '30em' }}>
          <div className="container-form sign-in">
            <div className="text-start">
              <img src="../logo.png" width="45" alt="Logo" />
              <span className="ms-2">GameStore</span>
            </div>

            <h2 className="fw-bold text-center py-4">
              Iniciar Sesión <br /> en GameStore
            </h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="userEmail" className="form-label">
                  Usuario o correo electrónico:
                </label>
                <input
                  type="email"
                  className={`form-control ${userEmailError && 'is-invalid'}`}
                  id="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <div className="invalid-feedback">{userEmailError}</div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Contraseña:
                </label>
                <Link className="password d-block mb-2 text-decoration-none" to="/reset-password">
                  Has olvidado tu contraseña?
                </Link>
                <input
                  type="password"
                  className={`form-control ${passwordError && 'is-invalid'}`}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="invalid-feedback">{passwordError}</div>
              </div>

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary w-50">
                  Iniciar Sesión
                </button>
              </div>

              <div className="my-3 text-center py-3">
                <Link to="/registrate">
                  Nuevo en GameStore? Crea una cuenta
                </Link>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
import React, { useState } from 'react';

const ResetPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-dark d-flex justify-content-center align-items-center vh-100">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
      <div>
        <div className="text-center py-3">
          <img src="../logo.png" width="75" alt="Logo" />
        </div>

        <div>
          <h2 className="text-light text-center py-3">Restablecer tu contraseña</h2>
        </div>

        <div className="bg-light p-5 rounded-5 text-secondary" style={{ width: '40em' }}>
          <div id="contenido" className="container-form">
            {!submitted ? (
              <form className="resetpassword" onSubmit={handleReset}>
                <div className="mb-4">
                  <label htmlFor="acc-email" className="form-label">
                    Ingrese la dirección de correo electrónico verificada de su cuenta de usuario y le enviaremos un mensaje de confirmación para restablecer la contraseña.
                  </label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="acc-email" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="new-pass" className="form-label">
                    Nueva contraseña:
                  </label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="new-pass" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="c-new-pass" className="form-label">
                    Confirmar nueva contraseña:
                  </label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="c-new-pass" 
                    required 
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Enviar correo electrónico para restablecer contraseña
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                Hemos enviado un código de confirmación a tu correo electrónico para restablecer tu contraseña.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
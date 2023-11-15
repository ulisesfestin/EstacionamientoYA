import React from 'react';
import { Link } from 'react-router-dom';

// Componente Dashboard
export const Dashboard = () => {
  return (
    <div className="container-fluid p-5 bg-dark">
    <h1 className='text-white text-center'>Bienvenido a la sección de administración <span class="badge bg-secondary">New</span></h1>
    <br></br>
    <br></br>
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-3 bg-primary text-white"> 
            <div className="card-header">Agregar estacionamiento</div>
            <div className="card-body">
              <p className="card-text">Como administrador, tiene la posibilidad de agregar los estacionamientos que hagan falta.</p>
              <Link to="/addparking" className="btn btn-dark"> 
                Ir a agregar un estacionamiento
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3 bg-success text-white"> 
            <div className="card-header">Gestionar estacionamientos</div>
            <div className="card-body">
              <p className="card-text">Aquí podrás listar, modificar y eliminar los estacionamientos existentes.</p>
              <Link to="/parkings" className="btn btn-dark"> 
                Ir a gestionar estacionamientos
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3 bg-warning text-black"> 
            <div className="card-header">Revisar reservas</div>
            <div className="card-body">
              <p className="card-text">Es importante llevar al día el control de los estacionamientos reservados... Aquí podrá hacerlo!</p>
              <Link to="/reservationhistory" className="btn btn-dark"> 
                Ir a historial de reservas
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3 bg-danger text-black"> 
            <div className="card-header">Estadísticas</div>
            <div className="card-body">
              <p className="card-text">Si necesita observar las mediciones de sus ventas, este es lugar indicado!</p>
              <Link to="/analytics" className="btn btn-dark"> 
                Ir a Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

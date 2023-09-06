import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-braknd" href="/#" > <img src={require(`../imagenes/um.png`) }  alt="" width="70px" height="70px" /></a> 
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
            
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" exact='true' to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" exact='true' to="/signup">SignUp</Link>
                </li>
            </ul>
        </div>
        </nav>
    </div>
  )
}

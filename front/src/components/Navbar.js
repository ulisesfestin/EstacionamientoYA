import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';



export const Navbar = () => {

    const { user,setUser } = useContext(UserContext);

    const handleLogOut = () => {
        setUser({
            role:'',
            logged:false
        })
        console.log('Logout')
    }

  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: 'black'}}>
            <a className="navbar-braknd" href="/#" > <img src={require(`../imagenes/um.png`) }  alt="" width="70px" height="70px" /></a> 
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {
                    //navbar administrador
                    user.role === '1' ? (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/parkings">Parkings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reservationhistory">History</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/analytics">Analytics</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={handleLogOut} >Salir</Link>
                            </li>
                        </ul>
                    //navbar usuario
                    ) : user.role === '2' ? (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/parkings">Parkings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/mybooking">My Booking</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={handleLogOut} >Salir</Link>
                            </li>
                        </ul>
                    //navbar pública
                    ):(
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" exact='true' to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">SignUp</Link>
                            </li>
                        </ul>
                    ) 
                }           
            </div>
        </nav>
    </div>
  )
}

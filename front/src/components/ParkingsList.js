import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export const ParkingsList = () => {
    const { user } = useContext(UserContext);

    const [parkings, setParkings] = useState([]);

    useEffect(() => {
        fetchParkings();
    }, []);

    const fetchParkings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/parkings');
            console.log(response)
            setParkings(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Código del estacionamiento</th>
                                <th scope="col">Disponibilidad</th>
                                <th scope="col">Precio por hora</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                parkings.map(parking => (
                                    <tr key={parking.id}>
                                        <td>{parking.code}</td>
                                        <td>{parking.availability ? 'Disponible' : 'Ocupado'}</td>
                                        <td>{parking.price_per_hour}</td>
                                        {
                                            // usuario comun solo puede postularse a la oferta
                                            user.role === '2' ? (
                                                <div>
                                                    <td> 
                                                        <button type="button" className="btn btn-success" > Reservar </button>
                                                    </td>
                                                </div>
                                            // admin puede editar y eliminar
                                            ):(
                                                <div>
                                                    <td> 
                                                        <button type="button" className="btn btn-warning"> Editar </button>
                                                    </td>
                                                    <td> 
                                                        <button type="button" className="btn btn-danger">Eliminar</button>
                                                    </td>  
                                                </div>
                                            )
                                        }
                                    </tr>
                                ))
                            }  

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

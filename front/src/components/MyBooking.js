import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';



export const MyBooking = () => {

  const { user } = useContext(UserContext);
  
  const userId = user.id;

  const [bookings, setBookings] = useState([]);


  useEffect(() => {
      fetchBookings();
    }, []);

  const fetchBookings = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/booking/${userId}`);
        console.log(response)
        setBookings(response.data);
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
                            <th scope="col">user_id</th>
                            <th scope="col">parking_id</th>
                            <th scope="col">entry</th>
                            <th scope="col">exit</th>
                            <th scope="col">amount</th>
                            <th scope="col">status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.user_id}</td>
                                    <td>{booking.parking_id}</td>
                                    <td>{booking.entry}</td>
                                    <td>{booking.exit}</td>
                                    <td>{booking.amount}</td>
                                    <td>{booking.status}</td>
                                    
                                    {
                                        // usuario comun solo puede eliminar su reserva
                                        user.role === '2' ? (
                                            <div>
                                                <td> 
                                                    <button type="button" className="btn btn-danger" >Eliminar</button>
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

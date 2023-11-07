import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import $wal from 'sweetalert2';



export const ReservationHistory = () => {

  const [bookings, setBookings] = useState([]);


  useEffect(() => {
      fetchBookings();
    }, []);

  const fetchBookings = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/bookings`);
        console.log(response)
        setBookings(response.data);
    }
    catch (error) {
        console.log(error);
    }
  };

  const DeleteBooking = async (booking_id) => {
    try {
        await axios.delete(`http://localhost:5000/booking/${booking_id}`);
        $wal.fire({
            icon: 'success',
            title: 'Reserva eliminada correctamente',
            showConfirmButton: false,
            timer: 1800
        })
        fetchBookings();
    }
    catch (error) {
        console.log(error);
    }
  }


  return (
    <div>
        <div className='row'>
            <div className='col-md-6'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Parking code</th>
                            <th scope="col">Entry</th>
                            <th scope="col">Exit</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.name}</td>
                                    <td>{booking.parking_code}</td>
                                    <td>{booking.entry}</td>
                                    <td>{booking.exit}</td>
                                    <td>{booking.amount}</td>
                                    <td>{booking.status}</td>
                                    
                                    <div>
                                        <td> 
                                            <button type="button" className="btn btn-warning">Edit</button>
                                        </td>
                                        <td> 
                                            <button type="button" className="btn btn-danger" onClick={() => DeleteBooking(booking.id)}>Delete</button>
                                        </td>
                                    </div>
                                    
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

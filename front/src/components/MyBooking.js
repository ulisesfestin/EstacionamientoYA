import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import $wal from 'sweetalert2';



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

  const updateParkingAvailability = async (parkingId) => {
    try {
        await axios.put(`http://localhost:5000/parking/${parkingId}`, {availability: true});
    } catch (error) {
        console.log(error)
    }
  }

  const DeleteBooking = async (booking_id, parking_id) => {
    try {
        await axios.delete(`http://localhost:5000/booking/${booking_id}`);
        $wal.fire({
            icon: 'success',
            title: 'Reserva eliminada correctamente',
            showConfirmButton: false,
            timer: 1800
        })
        updateParkingAvailability(parking_id);
        fetchBookings();
    }
    catch (error) {
        console.log(error);
    }
  }


  return (
    <div>
        <h1>Mis reservas</h1>
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
                                    
                                    <div>
                                        <td> 
                                            <button type="button" className="btn btn-danger" onClick={() => DeleteBooking(booking.id, booking.parking_id)}>Delete</button>
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

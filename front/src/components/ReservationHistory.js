import React, { useState, useEffect} from 'react';
import axios from 'axios';
import $wal from 'sweetalert2';



export const ReservationHistory = () => {

    const [bookings, setBookings] = useState([]);

    const [editedBooking, setEditedBooking] = useState({id: 0, entry: '', exit: '', amount: 0, status: ''});

    useEffect(() => {
        fetchBookings();
    }, []);
    
    const EditBooking = (booking) => {
        console.log(booking.entry, booking.exit)
        setEditedBooking(booking);
    }

    const handleInputChange = (e) => {
        console.log('valor de e.target.name', e.target.name)
        console.log('valor de e.target.value', e.target.value)
        setEditedBooking({ ...editedBooking, [e.target.name]: e.target.value });
    };

    const handleUpdateBooking = async () => {
        try {
            await axios.put(`http://localhost:5000/booking/${editedBooking.id}`, editedBooking);
            fetchBookings();
            setEditedBooking({id: 0, entry: '', exit: '', amount: 0, status: ''});
            $wal.fire({
                icon: 'success',
                title: 'Editado correctamente',
                showConfirmButton: false,
                timer: 1800
            })
        } catch (error) {
            console.error(error);
        }
    }

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
                                                <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editBookingModal" onClick={() => EditBooking(booking)}>Edit</button>
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
            <div className="modal fade" id="editBookingModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Editar reserva</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col'>
                                    <label>Fecha de entrada</label><br></br>
                                    <input
                                        type="datetime-local"
                                        name="entry"
                                        value={editedBooking.entry}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {/* <div className='col-md-2'></div> */}
                                <div className='col'>
                                    <label>Salida</label><br></br>
                                    <input
                                        type="datetime-local"
                                        name="exit"
                                        checked={editedBooking.exit}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {/* <div className='col-md-2'></div> */}
                                <div className='col'>
                                    <label>Monto total a pagar</label><br></br>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={editedBooking.amount}
                                        onChange={handleInputChange}
                                        placeholder="Precio"
                                    />
                                </div>
                                {/* <div className='col-md-2'></div> */}
                                <div className='col'>
                                    <label>Estado de la reserva</label><br></br>
                                    <input
                                        type="text"
                                        name="status"
                                        value={editedBooking.status}
                                        onChange={handleInputChange}
                                        placeholder="Estado"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdateBooking}> Editar </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

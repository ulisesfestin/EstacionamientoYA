import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import $wal from 'sweetalert2';


export const ParkingsList = () => {

    const { user } = useContext(UserContext);

    const [parkings, setParkings] = useState([]);

    const [editedParking, setEditedParking] = useState({ id: 0, code: '', availability: true, price_per_hour:0});

    const navigate = useNavigate();

    const onEditParking = (parking) => {
        setEditedParking(parking);
    };

    const handleInputChange = (e) => {
        console.log('valor de e.target.name', e.target.name)
        console.log('valor de e.target.value', e.target.value)
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setEditedParking({ ...editedParking, [e.target.name]: value });
    };

    const handleUpdateParking = async () => {

        try {
          await axios.put(`http://localhost:5000/parking/${editedParking.id}`, editedParking);
          fetchParkings();
          setEditedParking({ id: 0, code: '', availability: true, price_per_hour:0});
          $wal.fire({
            icon: 'success',
            title: 'Editado correctamente',
            showConfirmButton: false,
            timer: 1800
          })
          navigate('/parkings')
        } catch (error) {
          console.error(error);
        }
    };



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

    const addBooking = async (parkingId, parkingPrice) => {
        try {
            console.log('id del estacionamiento:',parkingId, '  precio del estacionamiento:',parkingPrice)
            navigate('/addbooking', {state: { parkingId, parkingPrice}});
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteParking = async (parkingId) => {
        try {
            await axios.delete(`http://localhost:5000/parking/${parkingId}`);
            $wal.fire({
                icon: 'success',
                title: 'Estacionamiento eliminado correctamente',
                showConfirmButton: false,
                timer: 1800
            })
            fetchParkings();
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
                                                        <button type="button" className="btn btn-success" onClick={() => addBooking(parking.id, parking.price_per_hour)} >Reservar</button>
                                                    </td>
                                                </div>
                                            // admin puede editar y eliminar
                                            ):(
                                                <div>
                                                    <td> 
                                                        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editJobModal" onClick={() => onEditParking(parking)}> Editar </button>
                                                    </td>
                                                    <td> 
                                                        <button type="button" className="btn btn-danger" onClick={() => deleteParking(parking.id)}>Eliminar</button>
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
            <div className="modal fade" id="editJobModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Editar estacionamiento</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='row'>
                            <div className='col-md-4'>
                                <label>Codigo de estacionamiento</label><br></br>
                                <input
                                    type="text"
                                    name="code"
                                    value={editedParking.code}
                                    onChange={handleInputChange}
                                    placeholder="Code"
                                />
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-4'>
                                <label>Precio por hora</label><br></br>
                                <input
                                    type="number"
                                    name="price_per_hour"
                                    value={editedParking.price_per_hour}
                                    onChange={handleInputChange}
                                    placeholder="Price per hour"
                                />
                            </div>
                            <div className='col-md-2'></div>
                            <div className='col-md-4'>
                                <label>Disponibilidad</label><br></br>
                                <input
                                    type="checkbox"
                                    name="availability"
                                    checked={editedParking.availability}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdateParking}> Editar </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

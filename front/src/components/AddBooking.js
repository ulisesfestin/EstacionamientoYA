import axios from 'axios';
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import React from 'react';
import { useLocation } from 'react-router-dom';



export const AddBooking = () => {

    const location = useLocation();
    const { parkingId, parkingPrice } = location.state;

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const initialValues = {
        parking_id: parkingId,
        user_id: user.id,
        amount: parkingPrice,
        entry:'',
        exit:'',
    }

    const updateParkingAvailability = async (parkingId) => {
        try {
            await axios.put(`http://localhost:5000/parking/${parkingId}`, {availability: false});
            navigate('/parkings')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async( values) => {

        try {
            const response = await axios.post('http://localhost:5000/booking', values)
            console.log(response.data)
            Swal.fire({
                icon: 'success',
                title: 'Agregado correctamente',
                showConfirmButton: false,
                timer: 1800
            })
            updateParkingAvailability(parkingId)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='container-fluid p-3'>
            <div className='row justify-content-center'> 
            <div className='col-md-6'>
            <h1>Crear reserva </h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form> 
                    <div className="form-floating">
                        <Field 
                        type="datetime-local" 
                        className="form-control" 
                        id="floatingName" 
                        placeholder="fecha y hora de entrada" 
                        name='entry'
                        />
                        <label htmlFor="floatingName">Entrada</label>
                    </div>
                    <div className="form-floating">
                        <Field 
                        type="datetime-local" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="fecha y hora de salida"
                        name='exit'
                        />
                        <label htmlFor="floatingInput">Salida</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleSubmit}>Crear reserva</button>
                </Form>
            </Formik>
            </div>
        </div> 
    </div>
  )
}
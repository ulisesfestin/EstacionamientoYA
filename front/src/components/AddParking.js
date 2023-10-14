import axios from 'axios';
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export const AddParking = () => {

    const navigate = useNavigate();

    const initialValues = {
        code: '',
        price_per_hour:''
    }

    const handleSubmit = async( values) => {

        try {
            const response = await axios.post('http://localhost:5000/parking', values)
            console.log(response.data)
            Swal.fire({
                icon: 'success',
                title: 'Agregado correctamente',
                showConfirmButton: false,
                timer: 1800
            })
            navigate('/parkings')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className='row justify-content-center'> 
            <div className='col-md-6'>
            <h1>Crear estacionamiento</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form> 
                    <div className="form-floating">
                        <Field 
                        type="text" 
                        className="form-control" 
                        id="floatingName" 
                        placeholder="Código del estacionamiento" 
                        name='code'
                        />
                        <label htmlFor="floatingName">Código</label>
                    </div>
                    <div className="form-floating">
                        <Field 
                        type="number" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="Precio por hora"
                        name='price_per_hour'
                        />
                        <label htmlFor="floatingInput">Precio</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleSubmit}>Agregar estacionamiento</button>
                </Form>
            </Formik>
            </div>
        </div> 
    </div>
  )
}
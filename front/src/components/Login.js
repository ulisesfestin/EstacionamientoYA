import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';


export const Login = () => {

  const navigate = useNavigate();

  const initialValues = {
    email:'',
    password:''
  }

  const { setUser } = useContext(UserContext);

  const handleForm = async(values) => {
    // console.log('values:', values)
    try {
      const response = await axios.post('http://localhost:5000/auth/login', values)
      console.log(response.data)
      const { role, id } = response.data
      setUser({
        logged:true,
        role: role,
        id: id
      })
      Swal.fire({
        icon: 'success',
        title: 'Successful login!!',
        text: 'We are glad to see you again!!',
        showConfirmButton: false,
        timer: 3000
      })
      navigate('/parkings')
    } catch (error) {
      console.log(error)
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Parece que ocurrió un error al iniciar sesión! Intenta nuevamente.',
      //   // showConfirmButton: true,
      //   confirmButtonText: 'Ok'
      // })
    }
  }
  

  return (
    <div className='container-xxl' id='container'>
      <div className='row justify-content-center' id='loginform'> 
        <div className='col'>
        <h1>Login to EstacionamientoYA</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleForm}
        >
          <Form> 
                <div className="form-floating" id='input'>
                  <Field 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com"
                    name='email'
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating" id='input'>
                  <Field 
                    type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    placeholder="Password" 
                    name='password'
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleForm}>Sign in</button>
          </Form>
        </Formik>
      </div>
    </div> 
    </div>
  )
}

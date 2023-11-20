import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';


export const SignUp = () => {

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

    const initialValues = {
        name:'',
        email:'',
        password:''
      }
      
      const handleForm = async(values) => {
        try {
          const response = await axios.post('http://localhost:5000/auth/signup', values)
          console.log(response.data)
          const { role, id } = response.data
          setUser({
            logged:true,
            role: role,
            id: id
          })
          Swal.fire({
            icon: 'success',
            title: 'Successful registration!!',
            text: 'Welcome to EstacionamientoYA!',
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/parkings')
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div className='container-xxl' id='container' style={{ backgroundColor: '#333333' }}>
      <div className='row justify-content-center' id='loginform'> 
        <div className='col'>
        <h1>Create your account</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleForm}
        >
          <Form> 
                <div className="form-floating" id='input'>
                  <Field 
                    type="name" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name"
                    name='name'
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
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

                <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleForm}>Get started!</button>
          </Form>
        </Formik>
      </div>
    </div> 
    </div>
  )
}

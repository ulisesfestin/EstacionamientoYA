import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export const SignUp = () => {

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
          navigate('/dashboard')
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div>
      <div className='row justify-content-center'> 
        <div className='col-md-6'>
        <h1>Sign up</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleForm}
        >
          <Form> 
                <div className="form-floating">
                  <Field 
                    type="name" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name"
                    name='name'
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating">
                  <Field 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com"
                    name='email'
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                  <Field 
                    type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    placeholder="Password" 
                    name='password'
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleForm}>Sign up</button>
          </Form>
        </Formik>
      </div>
    </div> 
    </div>
  )
}

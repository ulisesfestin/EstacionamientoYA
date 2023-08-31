import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {

    const initialValues = {
        name:'',
        email:'',
        password:''
      }
      
      const handleForm = async(values) => {
        try {
          const response = await axios.post('http://localhost:5000/signup', values)
          console.log(response.data)
          navigate('/dashboard')
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div>
        {/* acá el diseño del formulario + formik */}
    </div>
  )
}

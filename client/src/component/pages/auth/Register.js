import React ,{ useState }from 'react'
import { toast } from 'react-toastify';
//functions
import { register } from '../../functions/auth';

const Register = () => {
    const [value , setValue] = useState({
        username:"",
        password:"",
        password1:""
    });

    const handdleChange =(e)=>{
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };


    // console.log(value);

    const handdleSubmit = (e)=>{
        e.preventDefault()
        console.log(value);
        if (value.password !== value.password1){
            toast.warn('Password not match')
        }else{
            register(value)
            .then(res=>{
                console.log(res.data)
                toast.success(res.data)
            
            }).catch((err)=>{
                console.log(err.response.data)
                toast.error(err.response.data)
            });
        }
    };


  return (
    <div className='container p-5'>
        <h1>Register Form</h1>
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <form onSubmit={handdleSubmit}>
                    <div className='form-group'>
                        <label >Username</label>
                        <input 
                        type="text" 
                        name='username' 
                        onChange={handdleChange}
                        className='form-control'
                        />
                    </div>

                    <div className='form-group'>
                        <label >Password</label>
                        <input type="text" 
                        name='password' 
                        onChange={handdleChange}
                        className='form-control'
                        />
                    </div>

                    <div className='form-group'>
                        <label >Confirm Password</label>
                        <input type="text" 
                        name='password1' 
                        onChange={handdleChange}
                        className='form-control'
                        />
                    </div>

                    <div style={{padding: '10px'}}>
                    <button 
                    disabled={value.password.length < 6}
                    className='btn btn-primary'
                    >
                        submit
                    </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register


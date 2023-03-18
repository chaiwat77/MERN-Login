import React ,{ useState }from 'react'
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
            alert('Password not match')
        }else{
            register(value)
            .then(res=>{
                console.log(res.data)
                alert(res.data)
               
            }).catch((err)=>{
                console.log(err.response.data)
                alert(err.response.data)
            });
        }
    };


  return (
    <div>
        <form onSubmit={handdleSubmit}>
            <label >Username</label>
            <input type="text" name='username' onChange={handdleChange}/>

            <label >Password</label>
            <input type="text" name='password' onChange={handdleChange}/>
            <label >Confirm Password</label>
            <input type="text" name='password1' onChange={handdleChange}/>
            <button disabled={value.password.length < 6}>submit</button>
        </form>
    </div>
  )
}

export default Register


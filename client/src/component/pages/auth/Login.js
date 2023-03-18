import React,{ useState } from 'react'

//function
import { login } from '../../functions/auth'

const Login = () => {

  const [value , setValue] = useState({
    username:"",
    password:"",
});

  const handdleChange =(e)=>{
  setValue({
      ...value,
      [e.target.name]: e.target.value,
  });
};

const handdleSubmit = (e)=>{
  e.preventDefault()
  console.log(value);
    login(value)
      .then(res=>{
          console.log(res.data)
          alert(res.data)
         
      }).catch((err)=>{
          console.log(err.response.data)
          alert(err.response.data)
      });
};

  return (

    <div>
        <form onSubmit={handdleSubmit}>
            <label >Username</label>
            <input type="text" name='username' onChange={handdleChange}/>
            <label >Password</label>
            <input type="text" name='password' onChange={handdleChange}/>
            <button >submit</button>
        </form>
    </div>
  )
}

export default Login

import React,{ useState } from 'react'


//function
import { login } from '../../functions/auth'

// redux
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value , setValue] = useState({
    username:"",
    password:"",
});

const roleBaseRedirect = (role) =>{
  console.log(role);
  if(role === 'admin'){
    navigate('/admin/index');
  }else{
    navigate('/user/index');
  }
}


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
          
          dispatch({
            type: 'LOGIN',
            payload: {
              token: res.data.token,
              username:res.data.payload.user.username,
              rolse: res.data.payload.user.role,
            },
          });

          localStorage.setItem('token',res.data.token);
          roleBaseRedirect(res.data.payload.user.role);
         
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

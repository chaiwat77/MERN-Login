const express = require('express');
const router = express.Router();

//controller
const { register,login,listUser,editUser,deleteUser } = require('../controllers/auth')

//middleware
const {auth} = require('../middleware/auth')

//@Endpoint  http://localhost:3000/api/auth
//@Method    POST
//@Access    Public
router.post("/register", register);


//@Endpoint  http://localhost:3000/api/login
//@Method    POST
//@Access    Public
router.post("/login", login);


router.get('/1',auth,(req,res)=>{
    res.send('hello 1')
})


//@Endpoint  http://localhost:3000/api/auth
//@Method    GET
//@Access    Public
router.get("/auth", listUser);

//@Endpoint   http://localhost:3000/api/auth
//@Method    PUT
//@Access    Public
router.put("/auth", editUser);

//@Endpoint   http://localhost:3000/api/auth
//@Method    DELETE
//@Access    Public
router.delete("/auth", deleteUser);

module.exports = router;
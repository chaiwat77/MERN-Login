const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    try {
        //check user
        const { username, password } = req.body;
        let user = await User.findOne({username})
        if (user){
          return res.status(400).send('User Already exists');
        }
        const salt = await bcrypt.genSalt(10);
        user = new User({
            username,
            password,
        });
        
        //Encrypt
        user.password = await bcrypt.hash(password,salt);
        await user.save();

        res.send('register success');
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error!!')
    }
}

exports.login = async (req,res) => {
    try {
        const { username, password } = req.body;
        var user = await User.findOneAndUpdate({username},{new:true});
        if (user && user.enabled){
            
            //check Password
            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch) {
                return res.status(400).send('Password Invalid!');
            }
            //Payload
            const payload = {
                user:{
                    username: user.username,
                    role: user.role,
                }
            }

            //Gen Token
            jwt.sign(payload,'jwtSecret',{ expiresIn: 3600 },(err,token)=>{ 
                if(err) throw err;
                res.json({token,payload});
            });
            
            // res.send('hello login');

        }else{
            return res.status(400).send('User not found !!');
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error!!')
    }
}

exports.listUser = async(req,res)=>{
    try {
        res.send('Hello listUser Controller')
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error!!')
    }
}

exports.editUser = async(req,res)=>{
    try {
        res.send('Hello editUser Controller')
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error!!')
    }
}


exports.deleteUser = async(req,res)=>{
    try {
        res.send('Hello deleteUser Controller')
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error!!')
    }
}
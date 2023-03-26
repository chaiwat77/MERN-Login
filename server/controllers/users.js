const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.listUsers = async(req,res)=>{
    try {
        const user = await User.find({}).select('-password').exec();
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error!!')
    }
}

exports.readUsers = async(req,res)=>{
    try {
        const id = req.params.id
        const user = await User.findOne({_id:id}).select('-password').exec()
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error!!')
    }
}

exports.updateUsers = async(req,res)=>{
    try {
        //วิธีที่ 1 basic
        // let newPassword = (req.body.values.password);
        //วิธีที่ 2 
        let {id ,password} = req.body.values
        // 1 gen salt
        const salt = await bcrypt.genSalt(10);
        //2 encrypt pass
        //วิธีที่ 1.1
        // let enPassword = await bcrypt.hash(newPassword,salt);
        //วิธีที่ 2.1
        let enPassword = await bcrypt.hash(password,salt);

        const user = await User.findOneAndUpdate(
            {_id: id},
            {password: enPassword}
            )
        res.send(user)
        // res.send('Update user')
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error!!')
    }
}
exports.removeUsers = async(req,res)=>{
    try {
        const id = req.params.id
        const user = await User.findOneAndDelete({_id:id})
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error!!')
    }
}
exports.changeStatus = async(req,res)=>{
    try {
        console.log(req.body);
        const user = await User.findOneAndUpdate(
            {_id:req.body.id},
            {enabled:req.body.enabled}
            )
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error!!')
    }
}

exports.changeRole = async(req,res)=>{
    try {
        console.log(req.body);
        const user = await User.findOneAndUpdate(
            {_id:req.body.id},
            {role:req.body.role}
            )
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('Sever Error!!')
    }
}

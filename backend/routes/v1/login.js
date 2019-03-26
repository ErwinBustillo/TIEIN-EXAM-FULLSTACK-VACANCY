const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var app = express();
const User = require('../../models/user');
const config = require('../../config/config');

app.post('/',(req,res)=>{
    var body = req.body;
    User.findOne({ email:body.email}, (err,user)=> {
        if(err){
            return res.status(500).json({
                msj: 'Error del servidor, por favor intente mas tarde',
                err
            });
        }
        
        if(!user){
            return res.status(404).json({
               msj: 'El usuario no existe en el sistema'
            });
        }
        
        if( !bcrypt.compareSync(body.password, user.password)){
            return res.status(404).json({
                msj: 'Error de credenciales, por favor verifique los datos de su cuenta',
            });
        }
        
        
        user.password = ':)';
        
        let u = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        var token = jwt.sign({user}, config.secret, { expiresIn: '24h'}); 
        
        res.status(200).json({
            token,
            user:u
        });
    });
});

module.exports = app;
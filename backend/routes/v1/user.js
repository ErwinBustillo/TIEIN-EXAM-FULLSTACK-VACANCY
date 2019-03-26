const express = require('express');
const bcrypt = require('bcryptjs');
var app = express();
const User = require('../../models/user');

app.get('/',(req,res)=>{
    User.find({})
        .populate('name email')
        .exec((err,users)=>{
            if (err) {
                return res.status(500).json({
                    msj: 'Error del servidor',
                    err
                });
            }

            res.status(200).json({
                users
            });
        });
});

app.post('/',(req,res)=>{
    var body = req.body;
    let u = new User();
    u.name = body.name; 
    u.email = body.email; 
    u.password = bcrypt.hashSync(body.password,10);
    u.save((err,user)=>{
        if (err) {
            return res.status(500).json({
                msj: 'Error interno del servidor',
                err
            });
        }

        res.status(201).json({
            msj: 'El usuario se ha creado correctamente'
        });
    });
});

module.exports = app;
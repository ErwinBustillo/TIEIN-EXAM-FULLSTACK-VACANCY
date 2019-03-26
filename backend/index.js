// Requires 
require('dotenv').config();
const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan  = require('morgan'); //LOGGER
const path = require('path');
const User = require('./models/user');
//ROUTES
const loginRoutes = require('./routes/v1/login');
const userRoutes = require('./routes/v1/user');
//====


let app = express();

// CORS
app.use(cors());

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //LOGS
app.use(morgan('combined'));

//Conexion a la base de datos
mongoose.connection.openUri(process.env.MONGODB_URI || 'mongodb://localhost:27017/examen-tie',(err,res)=>{
    if(err) throw err;
    console.log('Base de datos corriendo: \x1b[32m%s\x1b[0m', 'online');
    User.count({})
        .exec((err,counter)=>{
            if (counter == 0) {
                let dummy = [
                    {
                        name: 'Michael Jackson',
                        email: 'mjpop@gmail.com',
                        password: bcrypt.hash('123456',10)
                    },{
                        name: 'Harold Lopez',
                        email: 'harold.lopez@tie-in.co',
                        password: bcrypt.hash('123456',10)
                    },{
                        name: 'Erwin Bustillo',
                        email: 'berwin@uninorte.edu.co',
                        password: bcrypt.hash('123456',10)
                    }
                ];
                User.insertMany(dummy,(err,users)=>{
                    if (err) {
                        console.log('ocurrio un error al guardar los usuarios');
                    }
                    console.log('Usuarios de prueba guardados', users);
                })
            }else{
                console.log('Hay usuarios en DB');
            }
        });
});

app.use('/v1/users',userRoutes);
app.use('/v1/login',loginRoutes);

app.use('/',(req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000,()=>{
    console.log('Servidor corriendo !!');
});



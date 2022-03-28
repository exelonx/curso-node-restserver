const express = require('express');
const cors = require('cors');
const { dbCnn } = require('../database/conexion');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usariosPath = '/api/usuarios';

        //DB conectar
        this.conectarDB();

        //Middlewares
        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbCnn();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());
        
        //Direcctorio público
        this.app.use(express.static('public'));
    }

    routes(){        
        this.app.use(this.usariosPath, require('../routes/user.route'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Escuchando en el puerto '+this.port)
        });
    }

}

module.exports = Server;
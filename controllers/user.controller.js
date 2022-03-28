const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuario = (req, res=response)=>{
    const {nombre="no name"} = req.query;    
    res.json({
        msg: 'get API - Controlador',
        nombre
    });
}

const postUsuario = async(req, res=response)=>{
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();   //Grabado

    res.status(201).json({
        msg: 'Usuario agregado',
        usuario
    });
}

const putUsuario = (req, res=response)=>{
    const {id} = req.params;
    res.json({
        msg: 'put API - Controlador',
        id
    });
}

const patchUsuario = (req, res=response)=>{
    res.json({
        msg: 'patch API - Controlador'
    });
}

const deleteUsuario = (req, res=response)=>{
    res.json({
        msg: 'delete API - Controlador'
    });
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
    patchUsuario
}
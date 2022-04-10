const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuario = async(req, res=response)=>{
    const {limite = 5, desde = 0} = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
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

const putUsuario = async(req, res=response)=>{
    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const patchUsuario = (req, res=response)=>{
    res.json({
        msg: 'patch API - Controlador'
    });
}

const deleteUsuario = async(req, res=response)=>{
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
    res.json({
        msg: 'delete API - Controlador',
        id,
        usuario
    });
}

module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
    patchUsuario
}
const {response} = require('express');
const { validationResult } = require('express-validator');

const Usuario = require('../models/Usuario')

const createUser = async(req, res = response) => {
  const {email, password} = req.body;

  try {
    let usuario = await Usuario.findOne({email});
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe we'
      })
    }
      usuario = new Usuario(req.body);
      await usuario.save();
      res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name
      });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el admin'
    })
  }
}

//

const loginUser = (req, res = response) => {
  const {email, password} = req.body;  
  
  res.status(201).json({
    ok: true,
    msg: 'login',
    email,
    password,
  });
}

//

const renewToken = (req, res = response) => {

  res.json({
    ok: true,
    msg: 'renew'
  });
}

module.exports = { 
  createUser, 
  loginUser, 
  renewToken 
};
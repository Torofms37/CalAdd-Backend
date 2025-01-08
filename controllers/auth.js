const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')

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

      //Encriptar pass
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt)

      await usuario.save();

      //Generar JWT
      const token = await generarJWT(usuario.id, usuario.name);

      res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
      });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el admin'
    })
  }
}

//

const loginUser = async(req, res = response) => {
  const {email, password} = req.body;  

  try {
    const usuario = await Usuario.findOne({email});
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe we, con ese email'
      })
    };

    //Confirmas los pass
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      })
    };

      //Generar JWT
      const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el admin'
    })
  }

}

//

const renewToken = async(req, res = response) => {

  const { uid, name } = req;
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token
  });
}

module.exports = { 
  createUser, 
  loginUser, 
  renewToken 
};
// controllers/events.js
const { response } = require('express');
const Evento = require('../models/Event')

const getEventos = async(req, res = response) => {

    const eventos = await Evento.find()
                                .populate('user', 'name')
    
    res.json({
        ok: true,
        eventos
    })
}
const crearEvento = async(req, res = response) => {
    console.log(req.body);

    const evento = new Evento( req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizar Evento'
    })
}
const borrarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarEvento'
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
};

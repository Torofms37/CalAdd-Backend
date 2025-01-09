// routes/events.js
const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');

const router = Router();

// Todas tienen que pasar por la validación del token
router.use(validarJWT);

// Conseguir eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de termino es obligatoria').custom(isDate),
        validateFields
    ],
    crearEvento
);

// Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('date', 'La fecha es obligatoria').isDate(),
        validateFields
    ],
    actualizarEvento
);

// Eliminar evento
router.delete('/:id', borrarEvento);

module.exports = router;

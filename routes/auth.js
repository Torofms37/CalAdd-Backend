/* 
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();

const {validateFields} = require('../middlewares/validators');

//  
const { createUser, loginUser, renewToken} = require('../controllers/auth');

router.post(
  '/new',
    [
      check("name", "El nombre es obligatorio").not().isEmpty(),
      check("email", "El email es obligatorio").isEmail(),
      check("password", "El password debe tener mínimo 6 carácteres").isLength({min: 6}),
      validateFields
    ],
    createUser);

router.post(
  "/", 
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener mínimo 6 carácteres").isLength({min: 6}),
    validateFields
  ],
  loginUser);
router.get("/renew", renewToken);


module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();

//crear un nuevo usuario
router.post( '/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraeña es obligatorio').isLength({ min: 6}),
    validarCampos
] , crearUsuario );
//nombre: .not().isEmpty()

//login de usuario
router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraeña es obligatorio').isLength({ min: 6}),
    validarCampos
] ,loginUsuario );

//validar y revalidar token

router.get( '/renew',validarJWT, revalidarToken);



module.exports = router;
const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();

const {getUsuario, postUsuario, putUsuario, deleteUsuario, patchUsuario} = require('../controllers/user.controller');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/', getUsuario);

router.post('/',[//validaciones
    check('correo', 'El correo no es válido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({min:6}),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    check('correo').custom(emailExiste),
    validarCampos
], postUsuario);

router.put('/:id', putUsuario);

router.delete('/', deleteUsuario);

router.patch('/', patchUsuario);



module.exports = router;
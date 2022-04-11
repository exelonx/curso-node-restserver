const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();

const {getUsuario, postUsuario, putUsuario, deleteUsuario, patchUsuario} = require('../controllers/user.controller');
const { esRoleValido, emailExiste, idNoExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');


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

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idNoExiste),
    validarCampos
], putUsuario);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idNoExiste),
    validarCampos
], deleteUsuario);

router.patch('/', patchUsuario);



module.exports = router;
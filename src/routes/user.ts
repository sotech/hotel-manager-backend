import { Router } from 'express';
import * as controller from '../controllers/user';
import { check } from 'express-validator';
const router = Router();

router.post("/register", 
check('email')
.isEmail()
.withMessage('Debe ingresar un email valido.'), 
check('password')
.isLength({min:6})
.withMessage("La contraseña debe tener 6 caracteres como minimo"), controller.registerUser);
router.post("/login", controller.logUser);
router.get("/list", controller.getUsers)

export default router;

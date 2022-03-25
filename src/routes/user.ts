import { Router } from 'express';
const router = Router();
import * as controller from '../controllers/user';

router.post("/register", controller.registerUser);
router.post("/login", controller.logUser);

export default router;

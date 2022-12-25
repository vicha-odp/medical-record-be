import { Router } from 'express';
import login from './login';
import logout from './logout';
import refreshToken from './refreshToken';

const router: Router = Router();

// create
router.post('/login/admin', login.loginAdmin);
router.post('/login/patient', login.loginPatient);
router.post('/login/doctor', login.loginDoctor);
router.post('/logout/admin', logout.logoutAdmin);
router.post('/logout/patient', logout.logoutPatient);
router.post('/logout/doctor', logout.logoutDoctor);
router.post('/refreshToken/admin', refreshToken.refreshTokenAdmin);
router.post('/refreshToken/patient', refreshToken.refreshTokenPatient);
router.post('/refreshToken/doctor', refreshToken.refreshTokenDoctor);

export default router;

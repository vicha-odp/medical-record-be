import { Router } from 'express';
import createUser from './createUserController';
import getUser from './getUserController';
import getUserById from './getUserByIdController';

const router: Router = Router();

// create
router.post('/admin/createDefaultAdmin', createUser.createUserDefaultAdmin);
router.post('/admin/createAdmin', createUser.createUserAdmin);
router.post('/patient/createPatient', createUser.createUserPatient);
router.post('/doctor/createDoctor', createUser.createUserDoctor);

// get
router.get('/admin/getAdmin', getUser.getAllAdminData);
router.get('/patient/getPatient', getUser.getAllPatientData);
router.get('/doctor/getDoctor', getUser.getAllDoctorData);

// getById
router.get('/admin/getAdmin/:id', getUserById.getUserAdminById);
router.get('/patient/getPatient/:id', getUserById.getUserPatientById);
router.get('/doctor/getDoctor/:id', getUserById.getUserDoctorById);

export default router;

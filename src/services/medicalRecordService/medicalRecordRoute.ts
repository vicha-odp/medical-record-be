import { Router } from 'express';
import medicalRecord from './medicalRecordController';

const router: Router = Router();

// create
router.post(
  '/medicalRecord/createMedicalRecord',
  medicalRecord.createMedicalRecord
);
// get all
router.get('/medicalRecord', medicalRecord.getAllMedicalRecord);
// get by id
router.get('/medicalRecord/:medRecId', medicalRecord.getMedicalRecordById);

export default router;

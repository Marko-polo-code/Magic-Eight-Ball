import { Router } from 'express';
import { processEmployees } from './employeeProcessor';

const router = Router();

router.post('/employees', async (req, res) => {
  try {
    await processEmployees(req.body);
    res.status(200).send('Employees processed');
  } catch (error) {
    res.status(500).send('Error processing employees');
  }
});

export default router;

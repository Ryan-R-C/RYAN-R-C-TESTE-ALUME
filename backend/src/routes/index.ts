import { Router } from 'express';
import authRoutes from './auth';
import studentRoutes from './student';
import simulationRoutes from './simulation';

const router = Router();

router.use(authRoutes);
router.use(studentRoutes);
router.use(simulationRoutes);

export { router }; 
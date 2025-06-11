import { Router } from 'express';
import { createSimulation, listSimulations } from '../controllers/simulationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/simulations', authMiddleware, (req, res, next) => {
  createSimulation(req, res).catch(next);
});
router.get('/simulations', authMiddleware, (req, res, next) => {
  listSimulations(req, res).catch(next);
});

export default router;
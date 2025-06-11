import { Router } from 'express';
import { getMe, updateMe } from '../controllers/studentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/me', authMiddleware, (req, res, next) => {
  getMe(req, res).catch(next);
});
router.put('/me', authMiddleware, (req, res, next) => {
  updateMe(req, res).catch(next);
});

export default router; 
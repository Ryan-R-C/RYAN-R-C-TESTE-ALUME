import { Request, Response } from 'express';
import * as studentService from '../services/studentService';

interface AuthRequest extends Request {
  userId?: number;
}

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const estudante = await studentService.getMe(req.userId!);
    return res.json(estudante);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro ao buscar dados' });
  }
}

export async function updateMe(req: AuthRequest, res: Response) {
  try {
    const estudante = await studentService.updateMe(req.userId!, req.body);
    return res.json(estudante);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro ao atualizar dados' });
  }
}
import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function register(req: Request, res: Response) {
  try {
    const estudante = await authService.register(req.body);
    return res.status(201).json(estudante);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro ao registrar' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const result = await authService.login(req.body);
    return res.json(result);
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message || 'Erro ao fazer login' });
  }
}
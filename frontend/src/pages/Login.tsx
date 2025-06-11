import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../contexts/AuthContext';
import { loginSchema } from '../validators/schemas/authSchemas';
import type { LoginData } from '../types/authTypes';
import { useNavigate, Link } from 'react-router-dom';
import logoAlume from '../assets/logo-alume.png';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<LoginData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    try {
      const token = await login(data.email, data.senha);
      toast.success("Login realizado com sucesso!");

      setTimeout(() => {
        setLoading(false);
        navigate('/app', { state: { token } });
      }, 5 * 1000);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <img src={logoAlume} alt="Logo Alume" className='self-center'/>
        <h2 className="page_title mb-4">Login</h2>

        <input
          type="email"
          {...register('email')}
          placeholder="E-mail"
          className="input"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          {...register('senha')}
          placeholder="Senha"
          className="input mt-4"
        />
        {errors.senha && <p className="text-red-500">{errors.senha.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="button"
        >
          {(isSubmitting || loading) ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="mt-4 text-center">
          Não tem conta? <Link to="/register" className="text-primary underline">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

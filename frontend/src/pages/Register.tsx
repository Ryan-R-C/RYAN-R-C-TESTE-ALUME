import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerRequest } from '../services/authService';
import type { RegisterData } from '../types/authTypes';
import { useNavigate, Link } from 'react-router-dom';
import logoAlume from '../assets/logo-alume.png';
import { registerSchema } from '../validators/schemas/authSchemas';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<RegisterData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerRequest(data);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <img src={logoAlume} alt="Logo Alume" className='self-center'/>
        <h2 className="page_title mb-4">Cadastro</h2>

        <input
          type="text"
          {...register('nome')}
          placeholder="Nome"
          className="input"
        />
        {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}

        <input
          type="text"
          {...register('sobrenome')}
          placeholder="Sobrenome"
          className="input mt-4"
        />
        {errors.sobrenome && <p className="text-red-500">{errors.sobrenome.message}</p>}

        <input
          type="email"
          {...register('email')}
          placeholder="E-mail"
          className="input mt-4"
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
          disabled={isSubmitting}
          className="button"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="mt-4 text-center">
          Já tem conta? <Link to="/login" className="text-primary underline">Faça login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
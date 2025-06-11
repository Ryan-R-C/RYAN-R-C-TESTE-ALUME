import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import type { ProfileData } from '../types/authTypes';
import { profileSchema } from '../validators/schemas/authSchemas';
import { PencilSimpleIcon } from "@phosphor-icons/react";

const Profile: React.FC = () => {
  const { getProfile, updateProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState<ProfileData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getProfile();
      if (data) {
        setInitialData(data);
        setValue('nome', data.nome);
        setValue('sobrenome', data.sobrenome);
        setValue('email', data.email);
      }
    };

    fetchUserData();
  }, [getProfile, setValue]);

  const onSubmit = async (data: ProfileData) => {
    try {
      await updateProfile(data);
      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
      setInitialData(data);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao atualizar perfil.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="card w-full max-w-md">
        <h1 className="page_title">Perfil do Usuário</h1>
        
        {!isEditing && initialData && (
          <div className="space-y-4 w-full">
            <p><strong>Nome:</strong> {initialData.nome}</p>
            <p><strong>Sobrenome:</strong> {initialData.sobrenome}</p>
            <p><strong>E-mail:</strong> {initialData.email}</p>
            <button onClick={() => setIsEditing(true)} className="button-outline flex flex-row gap-1 justify-center " aria-label="Editar perfil">
              <PencilSimpleIcon size={24} className="text-primary cursor-pointer"/>
              Editar meu perfil
            </button>
          </div>
        )}

        {isEditing && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
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
              className="input"
            />
            {errors.sobrenome && <p className="text-red-500">{errors.sobrenome.message}</p>}

            <input
              type="email"
              {...register('email')}
              placeholder="E-mail"
              className="input"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="button-outline"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="button"
              >
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
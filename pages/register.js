import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div className="bg-gradient-to-t from-teal-200 via-cyan-500 to-white">

    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
        >
        <h1 className="mb-4 text-xl">Crea Cuenta</h1>
        <div className="mb-4">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register('name', {
              required: 'Por favor ingresa tu nombre',
            })}
            />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
            )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Por favor ingresa un email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Por favor ingresa un email v??lido',
              },
            })}
            className="w-full"
            id="email"
            ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
            )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Contrase??a</label>
          <input
            type="password"
            {...register('password', {
              required: 'Por favor ingresa una contrase??a',
              minLength: { value: 6, message: 'M??nimo: 6 car??cteres' },
            })}
            className="w-full"
            id="password"
            autoFocus
            ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
            )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirmar Contrase??a</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Por favor vuelve a ingresar la contrase??a',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'M??nimo: 6 car??cteres',
              },
            })}
            />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 ">No coincide la contrase??a</div>
              )}
        </div>

        <div className="mb-4 ">
          <button className="primary-button font-bold">Registrar</button>
        </div>
        <div className="mb-4 ">
          ??No tiene una cuenta? &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}><a className="hover:underline">Reg??strate</a></Link>
        </div>
      </form>
    </Layout>
  </div>
  );
}

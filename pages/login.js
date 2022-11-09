import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

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
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
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

    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
        >
        <h1 className="mb-4 text-xl">Ingresar</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Por favor entrar con email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Por favor ingresar un email válido',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
            ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
            )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            {...register('password', {
              required: 'Por favor ingresa contraseña',
              minLength: { value: 6, message: 'Mínimo: 6 carácteres' },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
            )}
        </div>
        <div className="mb-4 ">
          <button className="primary-button font-bold">Ingresar</button>
        </div>
        <div className="mb-4 ">
          ¿No tienes una cuenta? &nbsp;
          <Link  href={`/register?redirect=${redirect || '/'}`}><a className="hover:underline">Regístrate</a></Link>
        </div>
      </form>
    </Layout>
  </div>
  );
}

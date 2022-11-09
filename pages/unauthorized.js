import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {

  const router = useRouter();
  const { message } = router.query;

  return (
  <div className="bg-gradient-to-t from-teal-200 via-cyan-500 to-white">
    <Layout title="Unauthorized Page">
      <h1 className="text-xl">Acceso Denegado</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  </div> 
  );
}

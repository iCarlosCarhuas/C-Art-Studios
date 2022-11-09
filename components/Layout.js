import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {<div >Featured Products</div>
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        <title>{title ? title + ' - C-Art & Studios' : 'C-Art & Studios'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-20 items-center px-4 justify-between shadow-md">
            <div className="max-w-screen-lg cursor-pointer">
              <Link href="/">
              <h1 className='sm:text-4xl font-bold text-lg'>
                <span className='bg-slate-100 rounded-full border-indigo-100 border-8 px-4'>
                <span className='text-teal-500'>C-Art</span>
                <span className='text-purple-800'>&Studios</span>
                </span>
              </h1>
              </Link>
            </div>
            <div className='items-center'>
              <Link href="/cart">
                <a className="p-2 sm:text-xl text-sm">
                  Carrito
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-purple-500 px-2 py-1 sm:text-sm font-bold text-white text-xs">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>

              {status === 'loading' ? (
                'Cargando'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-teal-500 hover:text-purple-800 sm:text-xl text-sm">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute top-8 right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Perfíl
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                        >
                        Historial de Órdenes
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                          >
                          Panel Administrativo
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                        >
                        Salir de la Cuenta
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2 text-sm sm:text-lg">Ingresar</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        {/* backgroundImage */}
        <div  className="w-full h-full bg-no-repeat bg-cover bg-left bg-fixed" style={{backgroundImage: `url('/BACK01.png')`}}>

        {/* container */}
          <main className="container m-auto my-4 px-4 py-8 bg-white"> 
            {children}
          </main>
        
        </div>
        
        <footer className="flex h-10 justify-center items-center shadow-inner">
      {/* 
          <Link href="/"
          <img 
            src="/Portada.png"
            className="object-cover relative shadow-sm max-w-max h-full cursor-pointer"
          /> 
          </Link>
          */}
          <p className="font-bold">Copyright © 2022 C-Art & Studios</p>
        </footer>
      </div>
    </>
  );
}

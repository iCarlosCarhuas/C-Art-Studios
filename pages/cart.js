import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };
  return (
  <div className="bg-gradient-to-t from-teal-200 via-cyan-500 to-white">  
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Carrito de compras</h1>
      {cartItems.length === 0 ? (
        <div>
          El carrito esta vacio. <a className="hover:underline"><Link href="/">Vuelva a compras</Link></a>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Objeto</th>
                  <th className="p-5 text-right">Cantidad</th>
                  <th className="p-5 text-right">Precio</th>
                  <th className="p-5">Retirar</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <div className="flex items-center ml-4 py-1 space-between">
                          <a className="flex rounded h-20 shadow object-cover">
                          <img className="rounded"
                            src={item.image}
                            alt={item.name}
                            />
                          </a> 
                          <a className="ml-2 sm:block hidden">
                            &nbsp;
                          {item.name}
                          </a>
                        </div>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Sub-Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="primary-button w-full transition-all font-bold text-white"
                >
                  Verificar
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  </div>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });

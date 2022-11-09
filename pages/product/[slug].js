import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
  <div className="bg-gradient-to-t from-purple-500 via-cyan-400 to-white">
    <Layout title={product.name}>
      <div className="py-2 bg-teal-500 hover:bg-indigo-200 transition-all rounded pl-3 inline-block pr-3 mb-1">
        <Link href="/" ><div className="cursor-pointer text-lg font-bold text-purple-900 hover:text-teal-500 transition-all">Volver a Productos</div></Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="rounded md:col-span-2 bg-teal-300 bg-gradient-to-r from-indigo-200 px-5 py-8">
          
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow object-cover h-auto w-full pb-5"
          />
        </a>
        </div>
        <div>
          <ul>
            <li className='pb-2'>
              <h1 className="text-xl font-semibold">{product.name}</h1>
            </li>
            <li className='pb-2 text-teal'><b>Categoria:</b> {product.category}</li>
            <li className='pb-2'><b>Autor:</b> {product.brand}</li>
            {/* <li>
              {product.rating} of {product.numReviews} vistas
            </li> */}
            <li className='pb-2'> 
              <b><div className='pb-2'>Descripción</div></b> 
            <text disabled
              className="  py-2 px-0 w-full"
              >
              {product.description}
              </text>
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div className='font-semibold'>Precio</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div className='font-semibold'>Estado</div>
              <div>{product.countInStock > 0 ? 'En Venta' : 'Inhabilitado'}</div>
            </div>
            <button
              className="primary-button w-full font-bold text-white transition-all"
              onClick={addToCartHandler}
            >
              Agregar al carro
            </button>
          </div>
        </div>
      </div>
    </Layout>
  </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

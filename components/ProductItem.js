/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product, addToCartHandler }) {
  return ( 
    <div className="card bg-slate-500 bg-opacity-30  hover:scale-110 transition-all">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow object-cover h-auto w-full"
            
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg font-bold">{product.name}</h2>
          </a>
        </Link>
        <p className="my-2 italic">{product.brand}</p>
        <p className="mb-2">${product.price}</p>
        <button
          className="primary-button transition-all"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          <div className='font-bold text-white'>Agregar al Carro</div>
        </button>
      </div>
    </div>
  );
}

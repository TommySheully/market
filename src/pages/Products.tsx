import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import { appStatusSelector, productsSelector } from '@/app/selectors.ts'
import { Category } from '@/api/todolists-api.ts'
import { getProductsTC } from '@/reducers/products-reducer.ts'

const Products = () => {
  const status = useAppSelector<string|null>(appStatusSelector)
  const products = useAppSelector<Category[]|null>(productsSelector)
  const [productLimit, setProductLimit] = useState<number>(8);

  const dispatch = useAppDispatch()

  const handleLimitChange = (limit: number) => {
    setProductLimit(limit);
  };

  useEffect(() => {
    dispatch(getProductsTC(productLimit))
  }, [])

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-center space-x-4">
        <button
          disabled={status === 'loading'}
          onClick={() => handleLimitChange(8)}
          className="btn btn-primary"
        >
          8 продуктов
        </button>
        <button
          disabled={status === 'loading'}
          onClick={() => handleLimitChange(16)}
          className="btn btn-primary"
        >
          16 продуктов
        </button>
        <button
          disabled={status === 'loading'}
          onClick={() => handleLimitChange(20)}
          className="btn btn-primary"
        >
          20 продуктов
        </button>
      </div>
      {status === 'loading' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse flex flex-col space-y-4 p-4 bg-base-200 rounded-md">
              <div className="bg-base-300 h-40 rounded-md"></div>
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
              <div className="h-4 bg-base-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products && products.map(product => (
            <div key={product.id} className="card bg-base-100 shadow-md">
              <figure>
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover"/>
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-bold">{product.title}</h2>
                <p className="text-primary">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products

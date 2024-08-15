import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteProductTC, getProductTC } from '@/reducers/products-reducer.ts'
import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import { appStatusSelector, formProductSelector, productSelector } from '@/app/selectors.ts'
import { getIsForm } from '@/utils/isForm.ts'
import { deleteFormProductTC } from '@/reducers/form-reducer.ts'

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>()
  const status = useAppSelector<string|null>(appStatusSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isForm = getIsForm()

  const product = useAppSelector((state) => isForm ? formProductSelector(state, Number(id)) : productSelector(state, Number(id)))

  useEffect(() => {
    if (!product && status !== 'loading' && !isForm) {
      dispatch(getProductTC(Number(id)))
    }
  }, [])

  const handleEdit = () => navigate(`/${isForm ? 'form-products' : 'product'}/${id}/edit`)
  const handleDelete = () => dispatch(isForm ? deleteFormProductTC({id: Number(id), navigate}) : deleteProductTC({id: Number(id), navigate}))

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex justify-between w-full lg:w-1/2 mb-6 bg-white rounded-lg p-4">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
        >
          Назад
        </button>
        <div className="space-x-4">
          <button
            onClick={handleDelete}
            className="btn btn-neutral"
          >
            Удалить
          </button>
          <button
            onClick={handleEdit}
            className="btn btn-primary"
          >
            Редактировать
          </button>
        </div>
      </div>

      {product ? <div className="card w-full lg:w-1/2 bg-base-100 shadow-md">
        <figure className="p-4">
          <img src={product.image} alt={product.title} className="w-full h-64 object-cover"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{product.title}</h2>
          <p className="text-lg text-primary">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <div className="mt-4">
            <p className="font-bold">Category: <span className="font-normal">{product.category}</span></p>
            {product.rating && <p className="font-bold">Rating: <span
              className="font-normal">{product.rating.rate} / 5 ({product.rating.count} reviews)</span></p>}
          </div>
        </div>
      </div> : <div className="text-center">Продукт не найден</div>}

      {status === 'loading' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse flex flex-col space-y-4 p-4 bg-base-200 rounded-md">
              <div className="bg-base-300 h-40 rounded-md"></div>
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
              <div className="h-4 bg-base-300 rounded w-1/2"></div>
            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default ProductDetails

import React from 'react'
import { useAppSelector } from '@/app/store.ts'
import { formProductsSelector } from '@/app/selectors.ts'
import { Category } from '@/api/api.ts'
import { useNavigate } from 'react-router-dom'

const FormProducts = () => {
  const products = useAppSelector<Category[]>(formProductsSelector)
  const navigate = useNavigate()
  const handleCardClick = (id: number) => navigate(`/form-products/${id}`)
  const handleAdd = () => navigate('/form-products/create')

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-center space-x-4 bg-white rounded-lg p-4">
        <button
          onClick={handleAdd}
          className="btn btn-accent"
        >
          Добавить новый продукт для FORM списка
        </button>
      </div>
      {products.length ?
        (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="card bg-base-100 shadow-md" onClick={() => handleCardClick(product.id)}>
              <figure>
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover"/>
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-bold">{product.title}</h2>
                <p className="text-primary">${product.price}</p>
              </div>
            </div>
          ))}
        </div>)
        : (<div className="flex justify-center w-full items-center gap-2">
            <span className="text-xl">У вас пока нет личных продуктов</span>
          </div>
        )}

    </div>
  )
}

export default FormProducts

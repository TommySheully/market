import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import { createProductTC, getProductTC, updateProductTC } from '@/reducers/products-reducer.ts'
import { formProductSelector, productSelector } from '@/app/selectors.ts'
import { Rating } from '@/api/api.ts'
import { createFormProductTC, updateFormProductTC } from '@/reducers/form-reducer.ts'
import { getIsForm } from '@/utils/isForm.ts'

type FormData = {
  title: string;
  rating?: Rating;
  price: number;
  description: string;
  category: string;
  image: string;
};

const ProductForm = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isForm = getIsForm()

  const product = useAppSelector((state) => isForm ? formProductSelector(state, Number(id)) : productSelector(state, Number(id)))

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      title: '',
      rating: {rate: 0, count: 0},
      price: 0,
      description: '',
      category: '',
      image: ''
    }
  })

  useEffect(() => {
    if (!product && !isForm) {
      dispatch(getProductTC(Number(id)))
    }
  }, [])

  useEffect(() => {
    if (product) {
      setValue('title', product.title)
      setValue('price', product.price)
      setValue('description', product.description)
      setValue('category', product.category)
      setValue('image', product.image)

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      product.rating && setValue('rating', product.rating)
    }
  }, [product, setValue])

  const onSubmit = (data: FormData) => {
    if (id) {
      if (isForm) {
        dispatch(updateFormProductTC({ data: {...data, id: Number(id)}, navigate }))
      } else {
        dispatch(updateProductTC({ id: Number(id), data, navigate }))
      }
    } else {
      if (isForm) {
        dispatch(createFormProductTC({data, navigate}))
      } else {
        dispatch(createProductTC({data, navigate }))
      }
    }
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex justify-start w-full mb-6 bg-white rounded-lg p-4">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
        >
          Назад
        </button>
      </div>

      <div className="p-4 w-1/2 mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            {id ? 'Редактировать продукт' : 'Создать новый продукт'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Название
              </label>
              <input
                id="title"
                type="text"
                className="input input-bordered w-full"
                {...register('title', { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="price">
                Цена
              </label>
              <input
                id="price"
                type="number"
                className="input input-bordered w-full"
                {...register('price', { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Описание
              </label>
              <textarea
                id="description"
                className="textarea textarea-bordered w-full"
                {...register('description')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                Категория
              </label>
              <input
                id="category"
                type="text"
                className="input input-bordered w-full"
                {...register('category')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="image">
                Изображение (URL)
              </label>
              <input
                id="image"
                type="text"
                className="input input-bordered w-full"
                {...register('image')}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {id ? 'Сохранить изменения' : 'Создать продукт'}
            </button>
          </form>
        </div>
    </div>
  )
}

export default ProductForm

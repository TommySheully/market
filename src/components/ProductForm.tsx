import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { createProductTC, getProductTC, updateProductTC } from '@/reducers/products-reducer';
import { formProductSelector, productSelector } from '@/app/selectors';
import { Rating } from '@/api/api';
import { createFormProductTC, updateFormProductTC } from '@/reducers/form-reducer';
import { getIsForm } from '@/utils/isForm';

type FormData = {
  title: string;
  rating?: Rating;
  price: number;
  description: string;
  category: string;
  image: string;
};

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isForm = getIsForm();

  const product = useAppSelector(state =>
    isForm ? formProductSelector(state, Number(id)) : productSelector(state, Number(id))
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      rating: { rate: 0, count: 0 },
      price: 0,
      description: '',
      category: '',
      image: ''
    }
  });

  useEffect(() => {
    if (!product && !isForm) {
      dispatch(getProductTC(Number(id)));
    }
  }, [id, isForm, dispatch]);

  useEffect(() => {
    if (product) {
      setValue('title', product.title);
      setValue('price', product.price);
      setValue('description', product.description);
      setValue('category', product.category);
      setValue('image', product.image);

      if (product.rating) {
        setValue('rating', product.rating);
      }
    }
  }, [product, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (id) {
      if (isForm) {
        dispatch(updateFormProductTC({ data: { ...data, id: Number(id) }, navigate }));
      } else {
        dispatch(updateProductTC({ id: Number(id), data, navigate }));
      }
    } else {
      if (isForm) {
        dispatch(createFormProductTC({ data, navigate }));
      } else {
        dispatch(createProductTC({ data, navigate }));
      }
    }
  };

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
              className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
              {...register('title', { required: 'Название обязательно' })}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Цена
            </label>
            <input
              id="price"
              type="number"
              className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
              {...register('price', {
                required: 'Цена обязательна',
                min: { value: 0, message: 'Цена не может быть отрицательной' }
              })}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Описание
            </label>
            <textarea
              id="description"
              className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
              {...register('description', { required: 'Описание обязательно' })}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="category">
              Категория
            </label>
            <input
              id="category"
              type="text"
              className={`input input-bordered w-full ${errors.category ? 'input-error' : ''}`}
              {...register('category', { required: 'Категория обязательна' })}
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="image">
              Изображение (URL)
            </label>
            <input
              id="image"
              type="text"
              className={`input input-bordered w-full ${errors.image ? 'input-error' : ''}`}
              {...register('image', {
                required: 'URL изображения обязателен',
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: 'Введите действительный URL'
                }
              })}
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {id ? 'Сохранить изменения' : 'Создать продукт'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

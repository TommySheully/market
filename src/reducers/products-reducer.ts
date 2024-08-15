import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, productsAPI } from '@/api/api.ts'
import { handleServerNetworkError } from '@/utils/error-utils.ts'
import { setAppStatusAC } from '@/reducers/app-reducer.ts'
import { NavigateFunction } from 'react-router-dom';

export const getProductsTC = createAsyncThunk('products/setProductsAC', async (productLimit: number, { dispatch }) => {
  try {
    dispatch(setAppStatusAC({status: 'loading'}))
    const response = await productsAPI.getProducts(productLimit)
    dispatch(setProductsAC({ products: response.data }))
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleServerNetworkError({ message: error.message }, dispatch);
    } else {
      handleServerNetworkError({ message: 'An unknown error occurred' }, dispatch);
    }
  } finally {
    dispatch(setAppStatusAC({status: 'succeeded'}))
  }
})

export const getProductTC = createAsyncThunk('product/setProductAC', async (id: number, { dispatch }) => {
  try {
    dispatch(setAppStatusAC({status: 'loading'}))
    const response = await productsAPI.getProduct(id)
    dispatch(setProductAC({ product: response.data }))
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleServerNetworkError({ message: error.message }, dispatch);
    } else {
      handleServerNetworkError({ message: 'An unknown error occurred' }, dispatch);
    }
  } finally {
    dispatch(setAppStatusAC({status: 'succeeded'}))
  }
})

export const createProductTC = createAsyncThunk('products/createProduct', async (
  { data, navigate }: {data: Partial<Category>, navigate: NavigateFunction },
  { dispatch }
) => {
  try {
    dispatch(setAppStatusAC({status: 'loading'}))
    const response = await productsAPI.createProduct(data)
    dispatch(createProductAC({ product: response.data }))
    navigate(`/product/${response.data.id}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleServerNetworkError({ message: error.message }, dispatch);
    } else {
      handleServerNetworkError({ message: 'An unknown error occurred' }, dispatch);
    }
  } finally {
    dispatch(setAppStatusAC({status: 'succeeded'}))
  }
})


export const updateProductTC = createAsyncThunk('products/updateProduct', async (
  { id, data, navigate }: { id: number, data: Partial<Category>, navigate: NavigateFunction },
  { dispatch }
) => {
  try {
    dispatch(setAppStatusAC({status: 'loading'}))
    const response = await productsAPI.updateProduct(id, data)
    dispatch(updateProductAC({ product: response.data }))
    navigate(`/product/${id}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleServerNetworkError({ message: error.message }, dispatch);
    } else {
      handleServerNetworkError({ message: 'An unknown error occurred' }, dispatch);
    }
  } finally {
    dispatch(setAppStatusAC({status: 'succeeded'}))
  }
})

export const deleteProductTC = createAsyncThunk('products/deleteProduct', async ( { id, navigate }: {id: number, navigate: NavigateFunction }, { dispatch }) => {
  try {
    dispatch(setAppStatusAC({status: 'loading'}))
    await productsAPI.deleteProduct(id)
    dispatch(deleteProductAC({ id }))
    navigate('/');
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleServerNetworkError({ message: error.message }, dispatch);
    } else {
      handleServerNetworkError({ message: 'An unknown error occurred' }, dispatch);
    }
  } finally {
    dispatch(setAppStatusAC({status: 'succeeded'}))
  }
})


const slice = createSlice({
  name: 'PRODUCTS',
  initialState: {
    products: [] as Category[]
  },
  reducers: {
    setProductsAC(state, action: PayloadAction<{ products: Category[] }>) {
      state.products = action.payload.products
    },
    setProductAC(state, action: PayloadAction<{ product: Category }>) {
      const existingProduct = state.products.find(p => p.id === action.payload.product.id);
      if (!existingProduct) {
        state.products.push(action.payload.product);
      }
    },
    updateProductAC(state, action: PayloadAction<{ product: Category }>) {
      const index = state.products.findIndex(p => p.id === action.payload.product.id)
      if (index !== -1) {
        state.products[index] = action.payload.product
      }
    },
    deleteProductAC(state, action: PayloadAction<{ id: number }>) {
      state.products = state.products.filter(product => product.id !== action.payload.id)
    },
    createProductAC(state, action: PayloadAction<{ product: Category }>) {
      state.products.push(action.payload.product);
    },
  }
})

export const productsReducer = slice.reducer
export const { setProductsAC, updateProductAC, deleteProductAC, setProductAC, createProductAC } = slice.actions

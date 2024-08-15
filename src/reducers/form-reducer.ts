import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '@/api/api.ts'
import { handleServerNetworkError } from '@/utils/error-utils.ts'
import { setAppStatusAC } from '@/reducers/app-reducer.ts'
import { NavigateFunction } from 'react-router-dom'
import { AppRootStateType } from '@/app/store.ts'

export const createFormProductTC = createAsyncThunk('form/createFormProductAC', async (
  { data, navigate }: { data: Partial<Category>, navigate: NavigateFunction },
  { dispatch, getState }
) => {
  try {
    const state: AppRootStateType = getState() as AppRootStateType;
    const maxId = state.form.products.length > 0 ? Math.max(...state.form.products.map(p => p.id)) : 0;
    const newId = maxId + 1;

    dispatch(createFormProductAC({ product: { ...data, id: newId } as Category }))
    navigate(`/form-products/${newId}`);
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

export const deleteFormProductTC = createAsyncThunk('form/deleteFormProduct', async ( { id, navigate }: {id: number, navigate: NavigateFunction }, { dispatch }) => {
  try {
    dispatch(deleteFormProductAC({ id }))
    navigate('/form-products');
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

export const updateFormProductTC = createAsyncThunk('form/updateFormProductAC', async (
  { data, navigate }: { data: Category, navigate: NavigateFunction },
  { dispatch }
) => {
  try {
    dispatch(updateFormProductAC({ product: data }))
    navigate(`/form-products/${data.id}`);
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
  name: 'FORM',
  initialState: {
    products: [] as Category[]
  },
  reducers: {
    setFormProductsAC(state, action: PayloadAction<{ products: Category[] }>) {
      state.products = action.payload.products
    },
    setFormProductAC(state, action: PayloadAction<{ product: Category }>) {
      const existingProduct = state.products.find(p => p.id === action.payload.product.id);
      if (!existingProduct) {
        state.products.push(action.payload.product);
      }
    },
    updateFormProductAC(state, action: PayloadAction<{ product: Category }>) {
      const index = state.products.findIndex(p => p.id === action.payload.product.id)
      if (index !== -1) {
        state.products[index] = action.payload.product
      }
    },
    createFormProductAC(state, action: PayloadAction<{ product: Category }>) {
      state.products.push(action.payload.product);
    },
    deleteFormProductAC(state, action: PayloadAction<{ id: number }>) {
      state.products = state.products.filter(product => product.id !== action.payload.id)
    }
  }
})

export const formReducer = slice.reducer
export const { setFormProductAC, deleteFormProductAC, updateFormProductAC, setFormProductsAC, createFormProductAC } = slice.actions

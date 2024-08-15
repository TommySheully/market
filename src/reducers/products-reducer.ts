import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, productsAPI } from '@/api/todolists-api.ts'
import { handleServerNetworkError } from '@/utils/error-utils.ts'
import { setAppStatusAC } from '@/reducers/app-reducer.ts'

export const getProductsTC = createAsyncThunk('app/initializeAppTC', async (productLimit: number, { dispatch }) => {
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

const slice = createSlice({
  name: 'PRODUCTS',
  initialState: {
    products: [] as Category[]
  },
  reducers: {
    setProductsAC(state, action: PayloadAction<{ products: Category[] }>) {
      state.products = action.payload.products
    }
  }
})

export const productsReducer = slice.reducer
export const { setProductsAC } = slice.actions

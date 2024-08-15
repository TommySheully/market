import { ActionCreatorsMapObject, AnyAction, bindActionCreators, combineReducers } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from '../reducers/app-reducer.ts'
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { productsReducer } from '@/reducers/products-reducer.ts'

const rootReducer = combineReducers({
  products: productsReducer,
  app: appReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware() })

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>


export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export function useActions<T extends ActionCreatorsMapObject<unknown>>(actions: T) {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}

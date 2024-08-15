import { ActionCreatorsMapObject, AnyAction, bindActionCreators, combineReducers } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { productsReducer } from '@/reducers/products-reducer.ts'
import { formReducer } from '@/reducers/form-reducer.ts'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { appReducer } from '@/reducers/app-reducer.ts'

const persistConfig = {
  key: 'root',
  storage
}

const persistedFormReducer = persistReducer(persistConfig, formReducer)

const rootReducer = combineReducers({
  form: persistedFormReducer,
  products: productsReducer,
  app: appReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})


export const persist = persistStore(store)
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, void, AnyAction>


export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export function useActions<T extends ActionCreatorsMapObject<unknown>>(actions: T) {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}

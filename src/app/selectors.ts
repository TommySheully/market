import {AppRootStateType} from "./store";

export const errorSelector = (store: AppRootStateType) => store.app.error
export const appStatusSelector = (store: AppRootStateType) => store.app.status

export const productsSelector = (store: AppRootStateType) => store.products.products
export const productSelector = (store: AppRootStateType, id: number) => store.products.products.find((product) => product.id === Number(id))

export const formProductsSelector = (store: AppRootStateType) => store.form.products
export const formProductSelector = (store: AppRootStateType, id: number) => store.form.products.find((product) => product.id === Number(id))


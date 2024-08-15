import {AppRootStateType} from "./store";

export const appStatusSelector = (store: AppRootStateType) => store.app.status
export const productsSelector = (store: AppRootStateType) => store.products.products
export const appIsInitializedSelector = (store: AppRootStateType) => store.app.isInitialized
export const errorSelector = (store: AppRootStateType) => store.app.error

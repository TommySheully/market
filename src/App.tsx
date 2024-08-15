import './App.css'
import { ErrorSnackbar } from '@/components/ErrorSnackbar.tsx'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Products from '@/pages/Products/Products.tsx'
import Header from '@/pages/Header.tsx'
import ProductDetails from '@/components/ProductDetails.tsx'
import ProductForm from '@/components/ProductForm.tsx'
import FormProducts from '@/pages/FormProducts/FormProducts.tsx'

function App() {
  return (
    <div className="App">
      <ErrorSnackbar/>
      <Header/>
        <Routes>
          <Route path="/" element={<Navigate to={'/products'}/>}/>

          <Route path={'/products'} element={<Products/>}/>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/:id/edit" element={<ProductForm />} />
          <Route path="/product/create" element={<ProductForm />} />

          <Route path={'/form-products'} element={<FormProducts/>}/>
          <Route path="/form-products/:id" element={<ProductDetails />} />
          <Route path="/form-products/:id/edit" element={<ProductForm />} />
          <Route path="/form-products/create" element={<ProductForm />} />

          <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
        </Routes>
    </div>
  )
}

export default App

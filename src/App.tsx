import './App.css'
import { ErrorSnackbar } from '@/components/ErrorSnackbar.tsx'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Products from '@/pages/Products.tsx'
import Header from '@/pages/Header.tsx'

function App() {
  return (
    <div className="App">
      <ErrorSnackbar/>
      <Header/>
        <Routes>
          <Route path="/" element={<Navigate to={'/product'}/>}/>

          <Route path={'/product'} element={<Products/>}/>
          <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
        </Routes>
    </div>
  )
}

export default App

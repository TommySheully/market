import { Link } from 'react-router-dom'
import React from 'react'


const Header = () => {
  return (
    <header className="bg-base-100 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Мой Сайт
        </Link>
        <nav className="space-x-4">
          <Link to="/products" className="btn btn-ghost btn-sm">Продукты через API</Link>
          <Link to="/form-products" className="btn btn-ghost btn-sm">По форме</Link>
        </nav>
      </div>
    </header>

  )
}

export default Header

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SellersTable from '../admin/pages/sellers/SellersTable'
import Coupon from '../admin/pages/Coupon/Coupon'
import CouponForm from '../admin/pages/Coupon/CreateCouponForm'
import ProductForm from '../seller/pages/Products/AddProductForm'

const AdminRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<SellersTable/>}/>
    <Route path='/coupon' element={<Coupon/>}/>
    <Route path='/add-coupon' element={<CouponForm/>}/>
    <Route path='/addproductform' element={<ProductForm/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default AdminRoutes
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellersTable from '../admin/pages/sellers/SellersTable'
import Coupon from '../admin/pages/Coupon/Coupon'
import CouponForm from '../admin/pages/Coupon/CreateCouponForm'
import GridTable from '../admin/pages/Home Page/GridTable'
import ShopByCategoryTable from '../admin/pages/Home Page/ShopByCategoryTable'
import Deal from '../admin/pages/Home Page/Deal'
import ProductForm from '../seller/pages/Products/AddProductForm'

const AdminRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<SellersTable/>}/>
    <Route path='/coupon' element={<Coupon/>}/>
    <Route path='/add-coupon' element={<CouponForm/>}/>
    <Route path='/home-grid' element={<GridTable/>}/>
    <Route path='/shop-by-category' element={<ShopByCategoryTable/>}/>
    <Route path='/deals' element={<Deal/>}/>
    <Route path='/addproductform' element={<ProductForm/>}/>

  </Routes>
  )
}

export default AdminRoutes
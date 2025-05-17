import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../customer/pages/Home/Home'
import Products from '../customer/pages/Products/Products'
import ProductDetails from '../customer/pages/Products/ProductDetails/ProductDetails'
import Cart from '../customer/pages/Cart/Cart'
import Address from '../customer/pages/Checkout/AddressPage'
import Profile from '../customer/pages/Account/Profile'

import Footer from '../customer/components/Footer/Footer'
import Navbar from '../customer/components/Navbar/Navbar'
import NotFound from '../customer/pages/NotFound/NotFound'
import Auth from '../customer/pages/Auth/Auth'
import { useAppDispatch, useAppSelector } from '../Redux Toolkit/Store'
import { fetchUserCart } from '../Redux Toolkit/Customer/CartSlice'
import PaymentSuccessHandler from '../customer/pages/Pyement/PaymentSuccessHandler'
import Reviews from '../customer/pages/Review/Reviews'
import WriteReviews from '../customer/pages/Review/WriteReview'
import Wishlist from '../customer/pages/Wishlist/Wishlist'
import { getWishlistByUserId } from '../Redux Toolkit/Customer/WishlistSlice'

import SearchProducts from '../customer/pages/Search/SearchProducts'
import TermsAndConditions from '../customer/components/Footer/TermsAndConditions'
import PrivacyPolicy from '../customer/components/Footer/PrivacyPolicy'
import ShippingPolicy from '../customer/components/Footer/ShippingPolicy'
import AccessibilityStatement from '../customer/components/Footer/AccessibilityStatement'
import RefundPolicy from '../customer/components/Footer/RefundPolicy'


const CustomerRoutes = () => {
  const dispatch = useAppDispatch()
    const {  auth } = useAppSelector(store => store);

    useEffect(() => {
        dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
        dispatch(getWishlistByUserId())
    }, [auth.jwt])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/chat-bot' element={<ChatBot />} /> */}
        <Route path='/products/:categoryId' element={<Products />} />
        <Route path='/search-products' element={<SearchProducts />} />
        <Route path='/reviews/:productId' element={<Reviews />} />
        <Route path='/reviews/:productId/create' element={<WriteReviews />} />
        {/* <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} /> */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/checkout/address' element={<Address />} />
        {/* <Route path='/account/*' element={<Profile />} /> */}
        <Route path='/account/*' element={<Profile />} />

        <Route path='/login' element={<Auth/>} />
        <Route path='/payment-success/:orderId' element={<PaymentSuccessHandler/>} />
        <Route path='*' element={<NotFound />} />
        <Route path='/termsandconditions' element={<TermsAndConditions />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/shippingpolicy' element={<ShippingPolicy />} />
        <Route path='/accessibilitystatement' element={<AccessibilityStatement />} />
        <Route path='/refundpolicy' element={<RefundPolicy />} />
        
      </Routes>
      <Footer />
    </>

  )
}

export default CustomerRoutes
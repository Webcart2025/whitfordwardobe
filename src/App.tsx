import './App.css';
import { ThemeProvider } from '@emotion/react';
import customeTheme from './Theme/customeTheme';
import ProductDetails from './customer/pages/Products/ProductDetails/ProductDetails';

import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import CustomerRoutes from './routes/CustomerRoutes';
import AdminDashboard from './admin/pages/Dashboard/Dashboard';

import SellerAccountVerification from './seller/pages/SellerAccountVerification';
import SellerAccountVerified from './seller/pages/SellerAccountVerified';
import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';
import { useEffect } from 'react';
import { fetchSellerProfile } from './Redux Toolkit/Seller/sellerSlice';
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';

import AdminAuth from './admin/pages/Auth/AdminAuth';
import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';


import Mobile from './data/Products/mobile';

import ProductTable from './seller/pages/Products/ProductTable';
import TermsAndConditions from './customer/components/Footer/TermsAndConditions';
import PrivacyPolicy from './customer/components/Footer/PrivacyPolicy';
import ShippingPolicy from './customer/components/Footer/ShippingPolicy';
import AccessibilityStatement from './customer/components/Footer/AccessibilityStatement';
import RefundPolicy from './customer/components/Footer/RefundPolicy';
import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";


function App() {
  const dispatch = useAppDispatch()
  const { auth, sellerAuth, sellers, user } = useAppSelector(store => store)
const navigate=useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(fetchUserProfile({jwt:localStorage.getItem("jwt") || auth.jwt || "",navigate}));
      dispatch(fetchSellerProfile(localStorage.getItem("jwt") || sellerAuth.jwt))
    }

  }, [auth.jwt, sellerAuth.jwt])


  return (
    <ThemeProvider theme={customeTheme}>
      <div className='App' >


        <Routes>
          {sellers.profile && <Route path='/seller/*' element={<SellerDashboard />} />}
          {user.user?.role === "ROLE_ADMIN" && <Route path='/admin/*' element={<AdminDashboard />} />}
          <Route path='/verify-seller/:otp' element={<SellerAccountVerification />} />
          <Route path='/seller-account-verified' element={<SellerAccountVerified />} />
          <Route path='/become-seller' element={<BecomeSeller />} />
          <Route path='/admin-login' element={<AdminAuth />} />
          <Route path='/product-details/:categoryId/:name/:productId'/>
          <Route path='/product/:productId' element={<ProductDetails />} />
          <Route path='/dummy' element={<Mobile />} />
    
          <Route path='*' element={<CustomerRoutes />} />

          <Route path="/seller/*" element={<SellerDashboard />} />
          
          <Route path="/seller/products" element={<ProductTable />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/shippingpolicy" element={<ShippingPolicy />} />
          <Route path="/accessibilitystatement" element={<AccessibilityStatement />} />
          <Route path="/refundpolicy" element={<RefundPolicy />} />
          

        </Routes>
        {/* <Footer/> */}
      </div>



    </ThemeProvider>
  );
}

export default App;

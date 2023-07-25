import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import LandlordSingUp from './pages/LandlordSingUp';
import LandlordLogin from './pages/LandlordLogin';
import UserSingUp from './pages/UserSingUp';
import UserLogin from './pages/UserLogin';
import Home from './pages/Home';
import PaymentSteps from './pages/PaymentSteps';
import Listing from './pages/Listing';
import SingleListing from './pages/SingleListing';
import EditRent from './pages/EditRent';
import PaymentSucess from './pages/PaymentSucess';
import PaymentReject from './pages/PaymentReject';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Listing />}/>
        <Route path='/auth/sing-up' element={<LandlordSingUp />}/>
        <Route path='/auth/log-in' element={<LandlordLogin />}/>
        <Route path='/user/sing-up' element={<UserSingUp />}/>
        <Route path='/user/log-in' element={<UserLogin />}/>
        <Route path='/dashboard' element={<Home />}/>
        <Route path='/paymentSteps' element={<PaymentSteps />}/>
        <Route path='/single/:id' element={<SingleListing />}/>
        <Route path='/edit/:id' element={<EditRent />}/>
        <Route path='/paymentSucess' element={<PaymentSucess />}/>
        <Route path='/paymentReject' element={<PaymentReject />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

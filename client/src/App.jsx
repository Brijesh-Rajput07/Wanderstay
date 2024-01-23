import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Razorpay from './RezorPay';
import Indexpage from './pages/Indexpage'
import Loginpage from './pages/Loginpage'
import PlacesFormPage from './pages/PlacesFormPage';
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'

axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;
function App() {
  
  return (
    <UserContextProvider>
    <Routes>
      
      <Route path="/" element={<Layout/>}>
    <Route index element={<Indexpage/>} />
    <Route path="/login" element={<Loginpage/>} />
    <Route path="/register" element={<RegisterPage/>} />
    <Route path="/account" element={<ProfilePage/>} />
    <Route path="/account/places" element={<PlacesPage/>} />
    <Route path="/account/places/new" element={<PlacesFormPage/>} />
    <Route path="/account/places/:id" element={<PlacesFormPage/>} />
    <Route path="/place/:id" element={<PlacePage/>} />
    <Route path="/account/bookings" element={<BookingsPage/>} />
    <Route path="/account/bookings/:id" element={<BookingPage/>} />
    <Route path="/RezorPay" element={<Razorpay/>} />
    </Route>
  </Routes>
  </UserContextProvider>
  )
}

export default App

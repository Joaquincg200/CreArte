import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import "./css/home.css"
import Login from "./components/Login"
import Register from "./components/Register"
import Shop from "./components/Shop"
import SellerDashboard from "./components/SellerDashboard"
import AddProduct from "./components/AddProduct"
import Product from "./components/Product"
import Cart from "./components/Cart"


function App() {

  return (
    <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/product/:id" element={<Product/>}/>
      <Route path="/sellerDashboard" element={<SellerDashboard/>}/>
      <Route path="/sellerDashboard/add" element={<AddProduct/>}/>
    </Routes>
  )
}

export default App

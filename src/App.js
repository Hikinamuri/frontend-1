import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Delivery from "@/pages/Delivery";
import Contacts from "@/pages/Contacts";
import Auth from "@/pages/Auth";
import HowToOrder from "@/pages/HowToOrder";
import Frames from "@/pages/Frames";
import Sunglasses from "@/pages/Sunglasses";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import Profile from "@/pages/Profile";
import CheckoutPage from "@/pages/CheckoutPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/how-to-order" element={<HowToOrder />} />
              <Route path="/frames" element={<Frames />} />
              <Route path="/sunglasses" element={<Sunglasses />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from './components/header/Header'
import Footer from './components/footer/Footer'
import { Home, Admin, Contact, Checkout, Cart } from './pages'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <ChakraProvider>
       <Provider store={store}>
       <Router>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Admin" element={<Admin />} />
            <Route exact path="/Contact" element={<Contact />} />
            <Route exact path="/Checkout" element={<Checkout />} />
            <Route exact path="/Cart" element={<Cart />} />
            <Route exact path="/order" element={<Cart />} />
        </Routes>
        <Footer />
        </Router>
        </Provider>        
    </ChakraProvider>
  );
}

export default App;

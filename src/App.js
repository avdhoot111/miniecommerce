import './App.css';
import Navbar from './Components/Navbar';
import AllProducts from './Pages/AllProducts';
import Cart from './Pages/Cart'; // Import the Cart component
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './Pages/Login';
import Electronics from './Pages/Electronics';
import Jewelery from './Pages/Jewelery';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') ?? null);

  return (
    token ? <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/jewelery" element={<Jewelery />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </div> : <LoginPage token={token} setToken={setToken} />
  );
}

export default App;

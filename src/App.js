import React from "react";
import HomePage from "./components/home/homePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from "./components/users/userList";
import ProductList from "./components/products/ProductList";
import OrderList from "./components/orders/OrderList";
import ShowAllOrder from "./components/orders/ShowAllOrder";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/show-all-orders" element={<ShowAllOrder />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

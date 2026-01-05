import React from "react";
import HomePage from "./components/home/homePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from "./components/users/userList";
import ProductList from "./components/products/ProductList";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

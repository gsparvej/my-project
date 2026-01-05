import React from "react";
import HomePage from "./components/home/homePage";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserList from "./components/users/userList";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

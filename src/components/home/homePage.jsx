import React from "react";
import "./homePage.css";
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home">
            <header className="home-header">
                <h1>Welcome to My App</h1>
                <p>This is a simple React Home Page</p>
                <button className="home-btn">Get Started</button>
            </header>

            <section className="home-features">
                <div className="feature">
                    <h3>Fast</h3>
                    <p>React makes UI fast and responsive.</p>
                    <Link to="/users" className="user-btn">User List</Link>
                </div>

                <div className="feature">
                    <h3>Reusable</h3>
                    <p>Components can be reused easily.</p>
                    <Link to="/products" className="product-btn">Product List</Link>
                </div>

                <div className="feature">
                    <h3>Modern</h3>
                    <p>Uses modern JavaScript features.</p>
                    <Link to="/orders" className="order-btn">Orders</Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

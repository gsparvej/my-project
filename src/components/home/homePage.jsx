import React from "react";
import "./homePage.css";

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
                    <button className="user-btn">User List</button>
                </div>

                <div className="feature">
                    <h3>Reusable</h3>
                    <p>Components can be reused easily.</p>
                </div>

                <div className="feature">
                    <h3>Modern</h3>
                    <p>Uses modern JavaScript features.</p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;

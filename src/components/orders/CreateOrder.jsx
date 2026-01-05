import React, { useEffect } from 'react';
import './CreateOrder.css';

const CreateOrder = ({ order, users, products, handleChange, handleSubmit, closeModal, isEditing }) => {
    const selectedProduct = products.find(p => p.id === parseInt(order.productId));
    const totalPrice = selectedProduct ? (selectedProduct.price * order.quantity).toFixed(2) : "0.00";

    // Disable page scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="modal-overlay">
            <div className="glass-modal aesthetic-modal">
                <div className="accent-glow"></div>

                <div className="modal-content">
                    <div className="header-section">
                        <div className="icon-badge">
                            {isEditing ? '✎' : '🛒'}
                        </div>
                        <h2 className="glass-title">
                            {isEditing ? 'Edit Order' : 'New Order'}
                        </h2>
                        <p className="modal-subtitle">
                            {isEditing
                                ? 'Update order details below'
                                : 'Create a new purchase order'}
                        </p>
                    </div>

                    <div className="glass-form">
                        <div className="input-field">
                            <span>Select Customer</span>
                            <select
                                name="userId"
                                value={order.userId}
                                onChange={handleChange}
                            >
                                <option value="">Choose a customer...</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-field">
                            <span>Select Product</span>
                            <select
                                name="productId"
                                value={order.productId}
                                onChange={handleChange}
                            >
                                <option value="">Choose a product...</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} - ${product.price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-field">
                            <span>Quantity</span>
                            <input
                                type="number"
                                name="quantity"
                                min="1"
                                placeholder="Enter quantity..."
                                value={order.quantity}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-field">
                            <span>Order Status</span>
                            <select
                                name="status"
                                value={order.status}
                                onChange={handleChange}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="total-price-display">
                            <span className="total-label">Total Price:</span>
                            <span className="total-amount">${totalPrice}</span>
                        </div>

                        <div className="glass-actions">
                            <button className="cancel-link" onClick={closeModal}>Discard</button>
                            <button className="submit-glass" onClick={handleSubmit}>
                                {isEditing ? 'Update Order' : 'Create Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;

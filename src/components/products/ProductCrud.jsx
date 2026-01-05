import React from 'react';
import './productCrud.css';

const ProductCrud = ({ product, handleChange, handleSubmit, closeModal, isEditing }) => {
    return (
        <div className="modal-overlay">
            <div className="glass-modal aesthetic-modal">
                <div className="accent-glow"></div>

                <div className="modal-content">
                    <div className="header-section">
                        <div className="icon-badge">
                            {isEditing ? '✎' : '+'}
                        </div>
                        <h2 className="glass-title">
                            {isEditing ? 'Edit Product' : 'New Product'}
                        </h2>
                        <p className="modal-subtitle">
                            {isEditing
                                ? 'Update your product details below'
                                : 'Add a new product to your collection'}
                        </p>
                    </div>

                    <div className="glass-form">
                        <div className="input-field">
                            <span>Product Name</span>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter name..."
                                value={product.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-field">
                            <span>Price (USD)</span>
                            <input
                                type="text"
                                name="price"
                                placeholder="$ 0.00"
                                value={product.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-field">
                            <span>Description</span>
                            <textarea
                                name="description"
                                placeholder="Describe the product details..."
                                value={product.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="glass-actions">
                            <button className="cancel-link" onClick={closeModal}>Discard</button>
                            <button className="submit-glass" onClick={handleSubmit}>
                                {isEditing ? 'Update Entry' : 'Create Entry'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ProductCrud;

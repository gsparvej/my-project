import React from 'react';

const ProductCrud = ({ product, handleChange, handleSubmit, closeModal, isEditing }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="title">{isEditing ? 'Edit Product' : 'Create Product'}</h2>
                <div className="product-form">
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        placeholder="Input Product Name"
                        value={product.name}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        type="text"
                        name="price"
                        placeholder="Input Product Price"
                        value={product.price}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        type="text"
                        name="description"
                        placeholder="Input Product Description"
                        value={product.description}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        type="text"
                        name="description"
                        placeholder="Input Product Description"
                        value={product.description}
                        onChange={handleChange}
                    />
                    <div className="modal-actions">
                        <button className="add-btn" onClick={handleSubmit}>
                            {isEditing ? 'Update' : 'Save'}
                        </button>
                        <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCrud;

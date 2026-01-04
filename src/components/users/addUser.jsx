import React from "react";

const AddUser = ({ user, handleChange, handleSubmit, closeModal, isEditing }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="title">{isEditing ? 'Edit User' : 'Create User'}</h2>
                <div className="user-form">
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        placeholder="Input Your Full Name"
                        value={user.name}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="Input Your Email Address"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        type="text"
                        name="address"
                        placeholder="Input Your Address"
                        value={user.address}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        type="text"
                        name="phone"
                        placeholder="Input Your Phone Number"
                        value={user.phone}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        type="text"
                        name="age"
                        placeholder="Input Your Age"
                        value={user.age}
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

export default AddUser;
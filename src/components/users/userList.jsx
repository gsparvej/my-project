import { useState, useEffect } from "react";
import AddUser from "./addUser";
import "./userList.css";
import ProductList from "../products/ProductList";
import ShowProductModal from "../products/ShowProductModal";


const UserList = () => {
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem("users")
        return savedUsers ? JSON.parse(savedUsers) : []
    });

    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");
        return savedProducts ? JSON.parse(savedProducts) : [];
    });
    const [user, setUser] = useState({

        id: "",
        name: "",
        email: "",
        address: "",
        phone: "",
        age: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);
    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    // Handle input Change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Add or Update User
    const handleAddUser = () => {
        if (!user.name || !user.email)
            return;

        if (user.id) {
            // Update existing user
            const updatedUsers = users.map((u) => u.id === user.id ? user : u);
            setUsers(updatedUsers);
        } else {
            // Add new user
            const newUser = { ...user, id: Date.now() };
            setUsers([...users, newUser]);
        }
        closeModal();
    };

    const openAddModal = () => {
        setUser({ id: "", name: "", email: "", address: "", phone: "", age: "" });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUser({ id: "", name: "", email: "", address: "", phone: "", age: "" });
    };
    const closeProductModal = () => {
        setIsProductModalOpen(false);

    };

    // delete user
    const handleDeleteUser = (id) => {
        const filteredUsers = users.filter((u) => u.id !== id);
        setUsers(filteredUsers);
    };

    // edit user
    const handleEditUser = (id) => {
        const userToEdit = users.find((u) => u.id === id);
        setUser(userToEdit);
        setIsModalOpen(true);
    };
    const openProductModal = () => {
        setIsProductModalOpen(true);
    };
    return (
        <div className="user-container">
            <button className="add-btn" onClick={openAddModal}>Add User</button>
            <button onClick={openProductModal}>Show Products</button>
            <h3 className="list-title">User List</h3>
            <ul className="user-list">
                {users.map((u) => (
                    <li key={u.id} className="user-item">
                        <span className="user-info">{u.name} | {u.email} | {u.address} | {u.phone} | {u.age}</span>
                        <div className="action-buttons">
                            <button className="delete-btn" onClick={() => handleDeleteUser(u.id)}>Delete</button>
                            <button className="edit-btn" onClick={() => handleEditUser(u.id)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <AddUser
                    user={user}
                    handleChange={handleChange}
                    handleSubmit={handleAddUser}
                    closeModal={closeModal}
                    isEditing={!!user.id}
                />
            )}
            {isProductModalOpen && (
                <ShowProductModal
                    products={products}
                    closeModal={closeProductModal}
                />
            )}
        </div>
    );
};


export default UserList;
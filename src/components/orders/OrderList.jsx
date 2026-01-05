import { useEffect, useState } from "react";
import CreateOrder from "./CreateOrder";
import "./OrderList.css";
import { Link } from "react-router-dom";

const OrderList = () => {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("orders");
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    const [users] = useState(() => {
        const savedUsers = localStorage.getItem("users");
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const [products] = useState(() => {
        const savedProducts = localStorage.getItem("products");
        return savedProducts ? JSON.parse(savedProducts) : [];
    });

    const [order, setOrder] = useState({
        id: "",
        userId: "",
        productId: "",
        quantity: 1,
        status: "pending"
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleAddOrder = () => {
        if (!order.userId || !order.productId || !order.quantity) {
            alert("Please fill all fields!");
            return;
        }

        const selectedUser = users.find(u => u.id === parseInt(order.userId));
        const selectedProduct = products.find(p => p.id === parseInt(order.productId));

        if (!selectedUser || !selectedProduct) {
            alert("Invalid user or product selected!");
            return;
        }

        const totalPrice = selectedProduct.price * order.quantity;
        const orderDate = new Date().toISOString().split('T')[0];

        if (order.id) {
            // Update existing order
            const updatedOrders = orders.map((o) =>
                o.id === order.id
                    ? {
                        ...order,
                        userName: selectedUser.name,
                        userEmail: selectedUser.email,
                        productName: selectedProduct.name,
                        productPrice: selectedProduct.price,
                        totalPrice: totalPrice,
                        orderDate: o.orderDate
                    }
                    : o
            );
            setOrders(updatedOrders);
        } else {
            // Add new order
            const newOrder = {
                id: Date.now(),
                userId: parseInt(order.userId),
                userName: selectedUser.name,
                userEmail: selectedUser.email,
                productId: parseInt(order.productId),
                productName: selectedProduct.name,
                productPrice: selectedProduct.price,
                quantity: parseInt(order.quantity),
                totalPrice: totalPrice,
                orderDate: orderDate,
                status: order.status
            };
            setOrders([...orders, newOrder]);
        }
        closeModal();
    };

    const openAddModal = () => {
        setOrder({ id: "", userId: "", productId: "", quantity: 1, status: "pending" });
        setIsModalOpen(true);
    };
    const openShowAllOrdersModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setOrder({ id: "", userId: "", productId: "", quantity: 1, status: "pending" });
    };

    const handleDeleteOrder = (id) => {
        const filteredOrders = orders.filter((o) => o.id !== id);
        setOrders(filteredOrders);
    };

    const handleEditOrder = (id) => {
        const orderToEdit = orders.find((o) => o.id === id);
        setOrder({
            id: orderToEdit.id,
            userId: orderToEdit.userId,
            productId: orderToEdit.productId,
            quantity: orderToEdit.quantity,
            status: orderToEdit.status
        });
        setIsModalOpen(true);
    };

    const handleStatusChange = (id, newStatus) => {
        const updatedOrders = orders.map((o) =>
            o.id === id ? { ...o, status: newStatus } : o
        );
        setOrders(updatedOrders);
    };

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    return (
        <div className="order-page">
            <div className="order-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <span className="title-icon">🛒</span>
                        Order Management
                    </h1>
                    <p className="page-subtitle">Track purchases and manage orders</p>
                </div>
                <div className="header-stats">
                    <div className="stat-card">
                        <div className="stat-value">{orders.length}</div>
                        <div className="stat-label">Total Orders</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">${totalRevenue.toFixed(2)}</div>
                        <div className="stat-label">Revenue</div>
                    </div>
                </div>
                <button className="add-order-btn" onClick={openAddModal}>
                    <span className="btn-icon">+</span>
                    New Order
                </button>
                <button onClick={openShowAllOrdersModal}>

                    Show Orders
                </button>

            </div>

            <div className="orders-container">
                {orders.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📋</div>
                        <h3>No Orders Yet</h3>
                        <p>Create your first order to get started</p>
                    </div>
                ) : (
                    <div className="orders-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id}>
                                        <td className="order-id">#{o.id}</td>
                                        <td>
                                            <div className="customer-info">
                                                <div className="customer-name">{o.userName}</div>
                                                <div className="customer-email">{o.userEmail}</div>
                                            </div>
                                        </td>
                                        <td className="product-name">{o.productName}</td>
                                        <td className="quantity">{o.quantity}</td>
                                        <td className="price">${o.productPrice}</td>
                                        <td className="total-price">${o.totalPrice.toFixed(2)}</td>
                                        <td className="order-date">{o.orderDate}</td>
                                        <td>
                                            <select
                                                className={`status-badge status-${o.status}`}
                                                value={o.status}
                                                onChange={(e) => handleStatusChange(o.id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-edit" onClick={() => handleEditOrder(o.id)}>
                                                    ✎
                                                </button>
                                                <button className="action-delete" onClick={() => handleDeleteOrder(o.id)}>
                                                    🗑
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <CreateOrder
                    order={order}
                    users={users}
                    products={products}
                    handleChange={handleChange}
                    handleSubmit={handleAddOrder}
                    closeModal={closeModal}
                    isEditing={!!order.id}
                />
            )}
        </div>
    );
};

export default OrderList;

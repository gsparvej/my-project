import React, { useEffect } from 'react';
import './OrderList.css';

const ShowAllOrder = ({ orders, closeModal }) => {
    // Disable page scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="modal-overlay">
            <div className="glass-modal aesthetic-modal show-all-orders-modal">
                <div className="accent-glow"></div>

                <div className="modal-content">
                    <div className="header-section">
                        <div className="icon-badge">📋</div>
                        <h2 className="glass-title">All Orders Summary</h2>
                        <p className="modal-subtitle">Current status of all purchases</p>
                    </div>

                    <div className="orders-modal-body">
                        {orders.length === 0 ? (
                            <div className="empty-modal-state">
                                <p>No orders recorded yet.</p>
                            </div>
                        ) : (
                            <div className="modal-table-wrapper">
                                <table className="compact-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Customer</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((o) => (
                                            <tr key={o.id}>
                                                <td className="id-col">#{o.id.toString().slice(-4)}</td>
                                                <td>
                                                    <div className="customer-cell">
                                                        <span className="c-name">{o.userName}</span>
                                                    </div>
                                                </td>
                                                <td className="price-col">${o.totalPrice.toFixed(2)}</td>
                                                <td>
                                                    <span className={`status-pill status-${o.status}`}>
                                                        {o.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button className="submit-glass full-width-btn" onClick={closeModal}>
                            Close Window
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowAllOrder;

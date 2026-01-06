import React, { useEffect } from 'react';


const ShowAllOrder = ({ orders, closeModal }) => {
    // Disable page scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div>
            <div>
                <div>
                    <div>
                        <h2>All Orders Summary</h2>
                        <p>Current status of all purchases</p>
                    </div>

                    <div>
                        {orders.length === 0 ? (
                            <div>
                                <p>No orders recorded yet.</p>
                            </div>
                        ) : (
                            <div>
                                <table>
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
                                                <td>#{o.id.toString().slice(-4)}</td>
                                                <td>{o.userName}</td>
                                                <td>${o.totalPrice.toFixed(2)}</td>
                                                <td>{o.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div>
                        <button onClick={closeModal}>
                            Close Window
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowAllOrder;

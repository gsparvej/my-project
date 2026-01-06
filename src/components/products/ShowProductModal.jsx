import { useEffect } from "react";
import "./ShowProductModal.css";



const ShowProductModal = ({ products, closeModal }) => {
    console.log(products);
    // Disable page scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (


        <div className="product-modal-overlay">
            <h2>All Products Summary</h2>
            <p>Current status of all Products</p>


            <div>
                {products.length === 0 ? (
                    <div>
                        <p>No products recorded yet.</p>
                    </div>
                ) : (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id}>
                                        <td>#{p.id.toString().slice(-4)}</td>
                                        <td>{p.name}</td>
                                        <td>{p.description}</td>
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


    );
};
export default ShowProductModal;
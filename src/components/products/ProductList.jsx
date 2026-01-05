import { useEffect, useState } from "react";
import ProductCrud from "./ProductCrud";

const ProductList = () => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");
        return savedProducts ? JSON.parse(savedProducts) : [];
    });
    const [product, setProduct] = useState({
        id: "",
        name: "",
        price: "",
        description: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleAddProduct = () => {
        if (!product.name || !product.price || !product.description)
            return;

        if (product.id) {
            // Update existing product
            const updatedProducts = products.map((p) => p.id === product.id ? product : p);
            setProducts(updatedProducts);
        } else {
            // Add new product
            const newProduct = { ...product, id: Date.now() };
            setProducts([...products, newProduct]);
        }
        closeModal();
    };

    const openAddModal = () => {
        setProduct({ id: "", name: "", price: "", description: "" });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProduct({ id: "", name: "", price: "", description: "" });
    };

    const handleDeleteProduct = (id) => {
        const filteredProducts = products.filter((p) => p.id !== id);
        setProducts(filteredProducts);
    };

    const handleEditProduct = (id) => {
        const productToEdit = products.find((p) => p.id === id);
        setProduct(productToEdit);
        setIsModalOpen(true);
    };

    return (
        <div className="product-container">
            <button className="add-btn" onClick={openAddModal}>Add Product</button>
            <h3 className="list-title">Product List</h3>
            <ul className="product-list">
                {products.map((p) => (
                    <li key={p.id} className="product-item">
                        <span className="product-info">{p.name} | {p.price} | {p.description}</span>
                        <div className="action-buttons">
                            <button className="delete-btn" onClick={() => handleDeleteProduct(p.id)}>Delete</button>
                            <button className="edit-btn" onClick={() => handleEditProduct(p.id)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && (
                <ProductCrud
                    product={product}
                    handleChange={handleChange}
                    handleSubmit={handleAddProduct}
                    closeModal={closeModal}
                    isEditing={!!product.id}
                />
            )}
        </div>
    );
}

export default ProductList;
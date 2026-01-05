import { useEffect, useState } from "react";
import ProductCrud from "./ProductCrud";
import "./ProductList.css";

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
        <div className="product-page">
            <div className="product-header">
                <div className="header-content">
                    <h1 className="page-title">
                        <span className="title-icon">📦</span>
                        Product Catalog
                    </h1>
                    <p className="page-subtitle">Manage your inventory with style</p>
                </div>
                <button className="add-product-btn" onClick={openAddModal}>
                    <span className="btn-icon">+</span>
                    Add Product
                </button>
            </div>

            <div className="products-grid">
                {products.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <h3>No Products Yet</h3>
                        <p>Start by adding your first product</p>
                    </div>
                ) : (
                    products.map((p) => (
                        <div key={p.id} className="product-card">
                            <div className="card-header">
                                <div className="product-badge">New</div>
                                <h3 className="product-name">{p.name}</h3>
                            </div>
                            <div className="card-body">
                                <div className="price-tag">
                                    <span className="currency">$</span>
                                    <span className="amount">{p.price}</span>
                                </div>
                                <p className="product-description">{p.description}</p>
                            </div>
                            <div className="card-actions">
                                <button className="action-edit" onClick={() => handleEditProduct(p.id)}>
                                    <span>✎</span> Edit
                                </button>
                                <button className="action-delete" onClick={() => handleDeleteProduct(p.id)}>
                                    <span>🗑</span> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

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
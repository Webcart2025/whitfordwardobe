import React from "react";
import ProductCard from "./ProductCard";
import "./styles.css";

const products = [
    { image: "/images/product1.jpg", title: "Tom & Jerry: Trouble Maker", description: "Girls Cotton T-Shirts (2-8 Yrs)", price: "₹ 499" },
    { image: "/images/product2.jpg", title: "Solids: Griffin Green", description: "Boys Cotton Trousers", price: "₹ 749" },
    { image: "/images/product3.jpg", title: "Disney: Lightning Fast", description: "Boys Cotton T-Shirts (2-8 Yrs)", price: "₹ 499" },
    { image: "/images/product4.jpg", title: "Disney: Lightning Fast Joggers", description: "Boys Cotton Joggers (2-8 Yrs)", price: "₹ 699" },
];

const ProductGrid: React.FC = () => {
    return (
        <div className="product-grid-section">
            <h2 className="product-grid-title">Best Products</h2>
            <div className="product-grid">
                {products.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div>
            <button className="see-all-btn" onClick={() => alert("Redirecting to all clothes...")}>
                See All Clothes
            </button>
        </div>
    );
};

export default ProductGrid;

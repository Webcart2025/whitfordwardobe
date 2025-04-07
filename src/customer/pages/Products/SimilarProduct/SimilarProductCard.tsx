import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimilarProductCard = ({ product }: any) => {
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/product/${product.id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
            onClick={handleProductClick}
            className="cursor-pointer"
        >
            <div className="relative h-[300px]">
                <img 
                    className="h-full w-full object-cover" 
                    src={product.images[0]} 
                    alt={product.title} 
                />
            </div>
            <div className="details pt-3">
                <h1 className="font-semibold text-lg">{product.title}</h1>
                <div className="price flex items-center gap-3">
                    <span className="font-semibold text-gray-800">₹{product.sellingPrice}</span>
                    <span className="text-gray-400 line-through">₹{product.mrpPrice}</span>
                    <span className="text-[red] font-semibold">{product.discountPercent}% off</span>
                </div>
            </div>
        </div>
    );
};

export default SimilarProductCard;
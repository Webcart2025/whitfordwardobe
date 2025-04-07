import React from 'react';
import { useAppSelector } from '../../../../Redux Toolkit/Store';
import SimilarProductCard from './SimilarProductCard';

const SmilarProduct = ({ categoryId }: any) => {
    const { products } = useAppSelector((store) => store);

    return (
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            {products.products.map((item) => (
                <SimilarProductCard key={item.id} product={item} />
            ))}
        </div>
    );
};

export default SmilarProduct;

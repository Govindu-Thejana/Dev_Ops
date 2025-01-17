import React from 'react';
import { motion } from 'framer-motion';

const decodeBase64 = (base64String) => {
    try {
        const base64Data = base64String.startsWith('data:image/')
            ? base64String.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, '')
            : base64String;

        const binaryString = window.atob(base64Data);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);

        for (let i = 0; i < binaryLen; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'image/jpeg' });
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Failed to decode base64 string:', error);
        return '';
    }
};

const FruitCard = ({ product }) => {
    const imageUrl = decodeBase64(product.image);

    return (
        <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <a href={`/products/${product._id}`}>
                <img
                    className="h-48 w-full object-cover"
                    src={imageUrl || '/path-to-placeholder-image'}
                    alt={product.foodname}
                />
            </a>
            <div className="p-4">
                <a href={`/products/${product._id}`}>
                    <h2 className="text-lg font-bold hover:underline">{product.foodname}</h2>
                </a>
                <p className="mt-2 text-gray-600">
                    <span>{product.quantity}g</span>
                </p>
                <p className="mt-2 text-blue-700 font-semibold">
                    Rs. {product.discount ? (
                        <>
                            <span className="line-through">{product.price}</span> <span>{product.total}</span>
                        </>
                    ) : (
                        product.price
                    )}
                </p>
                <div className="mt-4">
                    <a
                        href={`/products/${product._id}`}
                        className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        View Details
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default FruitCard;
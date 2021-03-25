import React from 'react';
import './styles.css';

function Product({ image, name, sellingPrice, price }) {
    return (
        <div className="product">
            <div className="product-pic-container">
                <img className="product-pic" src={image} alt={name} />
            </div>
            <div className="product-info">
                <p className="product-name">{name}</p>
                <p className="product-selling-price">{sellingPrice}</p>
                <p className="product-price">{price}</p>
            </div>
        </div>
    );
}

function ProductTotal({ total }) {
    return (
        <div className="product-total">
            <p>Total</p>
            <p>{total}</p>
        </div>
    );
}

export { Product, ProductTotal };
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
                <p className="product-selling-price">{`R$ ${sellingPrice}`}</p>
                <p className="product-price">{`R$ ${price}`}</p>
            </div>
        </div>
    );
}

export default Product;
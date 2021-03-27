import React from 'react';
import './styles.css';

function Product({ uniqueId, image, name, quantity, sellingPrice, price, onAddProduct, onRemoveProduct }) {
    return (
        <div className="product">
            <div className="image-container">
                <img className="image" src={image} alt={name} />
            </div>
            <div className="body">
                <p className="name">{name}</p>
                <div className="data-container">
                    <div className="info">
                        <p className="selling-price">{sellingPrice}</p>
                        <p className="price">{price}</p>
                    </div>
                    <div className="quantity-controls">
                        <button onClick={() => onAddProduct(uniqueId)} className="btn-control">+</button>
                        <span className="quantity">{quantity}</span>
                        <button onClick={() => onRemoveProduct(uniqueId)} className="btn-control">-</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

function ProductTotal({ total }) {
    return (
        <div className="total">
            <p>Total</p>
            <p>{total}</p>
        </div>
    );
}

export { Product, ProductTotal };
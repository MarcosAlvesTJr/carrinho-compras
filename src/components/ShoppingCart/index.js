import React from 'react';
import { Card, CardTitle, CardBody, CardText, CardAction } from '../Card'
import { Product, ProductTotal, Subtotal, Discount } from '../Product'
import Loading from '../Loading'
import Alert from '../Alert'
import { convertToReais } from '../../utils/convertToReais'
import { useProducts } from '../../hooks/products';
import './styles.css'

function ShoppingCart() {
    const { products, loading, addProduct, removeProduct, finalPrice, pricesWithoutDiscount } = useProducts()

    return (
        <Loading show={loading}>
            <Card>
                <CardTitle>Meu carrinho</CardTitle>

                <CardBody>
                    {
                        products.map(product => (
                            <Product
                                key={product.uniqueId}
                                uniqueId={product.uniqueId}
                                name={product.name}
                                quantity={product.quantity}
                                sellingPrice={convertToReais(product.sellingPrice)}
                                price={convertToReais(product.price)}
                                image={product.imageUrl}
                                onAddProduct={addProduct}
                                onRemoveProduct={removeProduct}
                            />
                        ))
                    }
                </CardBody>

                <CardText>
                    <Subtotal subtotal={convertToReais(pricesWithoutDiscount)} />
                    <Discount discount={convertToReais(pricesWithoutDiscount - finalPrice)} />
                    <ProductTotal total={convertToReais(finalPrice)} />
                    <Alert text="Parabéns, sua compra tem frete grátis!" show={(finalPrice / 100) > 10} />
                </CardText>

                <CardAction>
                    <button className="btn">Finalizar compra</button>
                </CardAction>
            </Card>
        </Loading>
    );
}

export default ShoppingCart;
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ProductsContext = createContext({})

function ProductsProvider({ children }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)
                const response = await fetch(process.env.REACT_APP_API_ABOVE_10)
                const data = await response.json()
                const formattedProducts = data.items.map(({ uniqueId, name, quantity, price, sellingPrice, imageUrl }) => ({
                    uniqueId,
                    name,
                    quantity,
                    price,
                    sellingPrice,
                    imageUrl
                }))
                setProducts(formattedProducts)
            } catch (error) {
                alert('Não foi possível carregar os produtos :(')
            } finally {
                setLoading(false)
            }
        }

        getData()
    }, [setProducts, setLoading])

    const addProduct = useCallback((id) => {
        const found = products.find(product => product.uniqueId === id)
        const index = products.findIndex(product => product.uniqueId === id)
        found.quantity = found.quantity + 1

        const update = [...products]
        update.splice(index, 1, found)

        setProducts(update)
    }, [products])

    const removeProduct = useCallback((id) => {
        const found = products.find(product => product.uniqueId === id)

        if (found.quantity > 0) {
            const index = products.findIndex(product => product.uniqueId === id)
            found.quantity = found.quantity - 1

            const update = [...products]
            update.splice(index, 1, found)

            setProducts(update)
        }
    }, [products])

    const finalPrice = useMemo(() => {
        return products.reduce((prevProduct, currProduct) => {
            return (currProduct.sellingPrice * currProduct.quantity) + prevProduct
        }, 0)
    }, [products])

    const pricesWithoutDiscount = useMemo(() => {
        return products.reduce((prevProduct, currProduct) => {
            return (currProduct.price * currProduct.quantity) + prevProduct
        }, 0)
    }, [products])

    return (
        <ProductsContext.Provider
            value={{
                products,
                loading,
                addProduct,
                removeProduct,
                finalPrice,
                pricesWithoutDiscount
            }}>
            {children}
        </ProductsContext.Provider>
    );
}

function useProducts() {
    const context = useContext(ProductsContext)
    return context
}

export { ProductsProvider, useProducts };
import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import { Card, CardTitle, CardBody, CardText, CardAction } from './components/Card'
import { Product, ProductTotal, Subtotal, Discount } from './components/Product'
import Loading from './components/Loading'
import Alert from './components/Alert'
import { convertToReais } from './utils/convertToReais'

function App() {
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
  }, [setProducts])

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
    <>
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
    </>
  );
}

export default App;

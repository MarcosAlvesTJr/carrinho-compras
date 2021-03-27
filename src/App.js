import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Card, CardTitle, CardBody, CardText, CardAction } from './components/Card'
import { Product, ProductTotal } from './components/Product'
import Alert from './components/Alert'
import { convertToReais } from './utils/convertToReais'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getData() {
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
    }

    getData()
  }, [setProducts])

  const addProduct = (id) => {
    const found = products.find(product => product.uniqueId === id)
    const index = products.findIndex(product => product.uniqueId === id)
    found.quantity = found.quantity + 1

    const update = [...products]
    update.splice(index, 1, found)

    setProducts(update)
  }

  const removeProduct = (id) => {
    const found = products.find(product => product.uniqueId === id)

    if (found.quantity > 0) {
      const index = products.findIndex(product => product.uniqueId === id)
      found.quantity = found.quantity - 1

      const update = [...products]
      update.splice(index, 1, found)

      setProducts(update)
    }
  }

  const totalPrice = useMemo(() => {
    return products.reduce((prevProduct, currProduct) => {
      return (currProduct.price * currProduct.quantity) + prevProduct
    }, 0)
  }, [products])

  return (
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
        <ProductTotal total={convertToReais(totalPrice)} />
        <Alert text="Parabéns, sua compra tem frete grátis!" show={(totalPrice / 100) > 10} />
      </CardText>

      <CardAction>
        <button className="btn">Finalizar compra</button>
      </CardAction>
    </Card>
  );
}

export default App;

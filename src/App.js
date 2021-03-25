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
      const formattedProducts = data.items.map(({ uniqueId, name, price, sellingPrice, imageUrl }) => ({
        uniqueId,
        name,
        price,
        sellingPrice,
        imageUrl
      }))
      setProducts(formattedProducts)
    }

    getData()
  }, [setProducts])

  const totalPrice = useMemo(() => {
    return products.reduce((prevProduct, currProduct) => {
      return currProduct.price + prevProduct
    }, 0)
  }, [products])

  return (
    <div className="App">
      <Card>
        <CardTitle>Meu carrinho</CardTitle>

        <CardBody>
          {
            products.map(product => (
              <Product
                key={product.uniqueId}
                name={product.name}
                sellingPrice={convertToReais(product.sellingPrice)}
                price={convertToReais(product.price)}
                image={product.imageUrl}
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
    </div>
  );
}

export default App;

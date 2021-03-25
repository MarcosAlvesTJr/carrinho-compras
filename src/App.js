import './App.css';
import { Card, CardTitle, CardBody, CardText, CardAction } from './components/Card'
import Product from './components/Product'

function App() {
  return (
    <div className="App">
      <Card>
        <CardTitle>Meu carrinho</CardTitle>

        <CardBody>
          <Product name="Trufa de Morango" sellingPrice="1,23" price="1,11" image="http://codeby.vteximg.com.br/arquivos/ids/159959-800-1029/truffon-meio-amargo.png?v=636930938547630000" />
        </CardBody>

        <CardText>
          <p>Total</p>
          <p>R$ 9,95</p>
        </CardText>

        <CardAction>
          <button className="btn">Finalizar compra</button>
        </CardAction>
      </Card>
    </div>
  );
}

export default App;

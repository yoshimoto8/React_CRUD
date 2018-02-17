import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ProductsContainer from './ProductsContainer'
import FormContainer from './FormContainer'
import update from 'react-addons-update';

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/products')
    .then((results) => {
      this.setState({products: results.data})
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  createProduct = (product) => {
    axios.post('http://localhost:3001/products',{product: product} )
    .then((response) => {
      const newData = update(this.state.products, {$push:[response.data]})
      this.setState({products: newData})
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  deleateProduct = (id) => {
    axios.delete(`http://localhost:3001/products/${id}`)
    .then((response) => {
      const productIndex = this.state.products.findIndex(x => x.id === id)
      const deletedProducts = update(this.state.products, {$splice: [[productIndex, 1]]})
      this.setState({products: deletedProducts})
      console.log('set')
    })
    .catch((data) =>{
      console.log(data)
    })
  }

  updateProduct = (id, product) => {
    axios.patch(`http://localhost:3001/products/${id}`,{product: product})
    .then((response) => {
      const productIndex = this.state.products.findIndex(x => x.id === id)
      const products = update(this.state.products, {[productIndex]: {$set: response.data}})
      this.setState({products: products})
    })
    .catch((data) =>{
      console.log(data)
    })
  }


  render() {
    return (
      <div className='app-main'>
        <FormContainer  hendleAdd={this.hendleAdd} createProduct={this.createProduct}/>
        <ProductsContainer productData={this.state.products} deleateProduct={this.deleateProduct} updateProduct={this.updateProduct}/>
      </div>
    );
  }
}

export default MainContainer

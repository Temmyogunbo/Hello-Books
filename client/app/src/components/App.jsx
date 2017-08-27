import React from 'react';
import ReactDom from 'react-dom';
import Signup from './auth/Signup.jsx';
var array =[
  {product:"Apple", price:3},
  {product:"Banana", price:1},
  {product:"Carrot", price:2},
  {product:"Donuts", price:5},
  {product:"Eggplant", price:4}
]

var elements = array.map( (item) => {
  return <li>Product: {item.product} | Price: ${item.price}  </li>>
})

ReactDOM.render(
  <ol>{elements}</ol>,
  document.getElementById('app')
)
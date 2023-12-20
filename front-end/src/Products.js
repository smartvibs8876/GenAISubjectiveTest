import React from 'react'
import { useState, useEffect } from 'react';
import  { useNavigate } from 'react-router-dom'
import './Products.css'

function Products() {
        const [products, setProducts] = useState([]);
        const navigate = useNavigate();
        const [cart, setCart] = useState([]);
        console.log("Cart:- ", cart)
 
        useEffect(() => {
            let products = []
            const req = require.context('./images', false, /\.webp$/); 
            req.keys().forEach(image => {
              let product = {}
              switch (image){
                  case "./Iphone15.webp":
                    product.name = "Iphone 15"
                    product.description = `6.69 inches Super Retina XDR OLED Display
                    48MP Main, 12MP Ultra Wide, 12MP Telephoto Rear Camera
                    12 MP Selfie Camera, iOS 17 Operating System
                    Dual eSIM`
                    product.price = 70000
                    break;
                  case "./laptop.webp":
                    product.name = "HP Laptop"
                    product.description = "HP Laptop 15, Intel Celeron N4500, 15.6-inch (39.6 cm) HD, Micro-Edge, 8GB DDR4, 512GB SSD, Intel UHD Graphics, Dual Speakers, (Win 11, MSO 2021, Jet Black, 1.69 kg), 15s-fq3066TU"
                    product.price = 35000
                    break;
                  case "./refrigerator.webp":
                    product.name = "LG Refrigerator"
                    product.description = "LG 242 L 3 Star Smart Inverter Frost-Free Double Door Refrigerator (GL-I292RPZX, Shiny Steel, Door Cooling+)"
                    product.price = 20000;
                    break;
                  case "./smarttv.webp":
                    product.name = "Smart TV One Plus"
                    product.description = "OnePlus 80 cm (32 inches) Y Series HD Ready Smart Android LED TV (32Y1, Black) | Dolby Audio | Anti-Aliasing"                  
                    product.price = 13000
                    break;  
                  default:

              }
              product.image = req(image);
              products.push(product);
            });
      
            setProducts(products);
        }, [])
      
        function addToCart(product) {
          setCart([...cart, product]); 
        }
        useEffect(()=>{
          sessionStorage.setItem('cart', JSON.stringify(cart));
        },[cart])
      
        return (
          <div className="products">
            <div className="grid" >
              {products.map((product,index )=> (
                <div className="grid-item" style={{
                    width: '40%',
                    float: index % 2 === 0 ? 'left' : 'right'  
                  }}>
                  <div><strong>{product.name}</strong></div>
                  <div>{product.description}</div>  
                  <img src={product.image} style={{width: '300px', height: '300px'}} />
                  <button  className="add-button" onClick={() => addToCart(product)}>
                    Add to Cart  
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-info">
                <div>Items in Cart: {cart.length}</div>
                <button className='cart-button' onClick={(e) => {navigate('/cart')}}>Go To Cart</button>  
            </div>
            </div>
        )
      }

export default Products;
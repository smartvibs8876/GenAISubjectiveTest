import React from 'react'
import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
function Home(){
    const [images, setImages] = useState([]);
    useEffect(() => {
        const importImages = () => {
          const images = [];
    
          // import all jpgs in /src/images
          const req = require.context('./images', false, /\.webp$/); 
    
          req.keys().forEach(image => {
            images.push(req(image));
          });
    
          setImages(images);
        }
    
        importImages();
      }, []);
    
    return (
      <div className="centered-container">
        <Carousel 
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
          interval={3000}
         
        >
          {images.map(image => (
            <div key={image}>
              <img src={image}  style={{width: '300px', height: '300px'}} /> 
            </div>
          ))}
        </Carousel>
      </div>
    );
}

export default Home
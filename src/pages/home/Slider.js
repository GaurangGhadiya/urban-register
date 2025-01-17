import React from 'react'
import style from "./home.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { getImagePath } from '@/utils/CustomImagePath';

const Slider = () => {
  return (
    <div className={style.slider}>
        <Carousel  showArrows={false} showIndicators infiniteLoop useKeyboardArrows stopOnHover autoPlay showStatus={false} swipeable interval={2000} transitionTime={500} emulateTouch={false} swipeScrollTolerance={5}> 
                  <div> 
                      <Image width={500} height={400} className={style.sliderImg}  src={getImagePath("/b1.jpg")} alt="image1"/> 
  
                  </div> 
                  <div> 
                      <Image width={500} height={400} className={style.sliderImg}  src={getImagePath("/slider4.jpg")} alt="image2" /> 
  
                  </div> 
                  
                  <div> 
                      <Image width={500} height={400} className={style.sliderImg}  src={getImagePath("/b1.jpg")} alt="image1"/> 
  
                  </div> 
                  <div> 
                      <Image width={500} height={400} className={style.sliderImg}  src={getImagePath("/slider4.jpg")} alt="image2" /> 
  
                  </div> 
                  
                  <div> 
                      <Image width={500} height={400} className={style.sliderImg}  src={getImagePath("/b1.jpg")} alt="image1"/> 
  
                  </div> 
              </Carousel> 
    </div>
  )
}

export default Slider

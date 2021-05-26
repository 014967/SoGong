import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerContent = styled.img`
   width: 100%;
`
const Container = styled.div`

   margin-bottom: 64px;
   width: 100%;
   z-index: 1;

   & .slick-dots {
      bottom: 36px;
   }
   & .slick-dots li.slick-active button:before {
      font-size: 16px;
      opacity: 1;
      color: ${({ theme }) => theme.color.primary};
   }
   & .slick-dots li button:before {
      font-size: 16px;
      opacity: 1;
      color: ${({ theme }) => theme.color.gradient};
   }
`;

const settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   autoplay: true,
   autoplaySpeed: 10000, //(ms)
   pauseOnHover: true,
   arrows: true,
};

const Banner = () => {

   const [images, setImages] = useState([])

   const getImages = async () => {
      const { data: events } = await axios.get("/api/events")
      setImages(events.filter(event => event.available).map(event => event.img))
   }

   useEffect(() => {
      getImages()
   }, [])

   return (
      <>
         <Container>
            <Slider {...settings}>
               {
                  images.map((image, i) => (
                     <BannerContent key={i} src={image} />
                  ))
               }
            </Slider>
         </Container>
      </>
   );
}

export default Banner;

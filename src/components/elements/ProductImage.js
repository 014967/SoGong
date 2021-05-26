import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Image = styled.img`
  width: 500px;
  height: 500px; 
`
const Container = styled.div`
   margin-bottom: 64px;
   width: 500px;
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
   autoplaySpeed: 3000, //(ms)
   pauseOnHover: true,
   arrows: true,
};

const ProductImage = ({ img, detailImg }) => {
   return (
      <>
         <Container>
            <Slider {...settings}>
               {
                  [img].concat(detailImg).map((image, i) => (
                     <Image key={i} src={image} />
                  ))
               }
            </Slider>
         </Container>
      </>
   );
}

export default ProductImage;
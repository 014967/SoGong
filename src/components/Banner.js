import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerContent from './BannerContent'

const Container = styled.div`

   margin: 218px 0 64px;
   width: 100%;
   height: 560px;
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
   dots: true,
   //prevArrow : "<button type='button' class='slick-prev'>Previous</button>",		// html 설정 가능
   //nextArrow : "<button type='button' class='slick-next'>Next</button>",
   //dotsClass : "slick-dots",//css class 지정도 지정 가능
};

const Banner = () => {

   const onMouseEnter = (e) => {
      console.log('asdf')
   }
   return (
      <>
         <Container>
            <Slider {...settings} onMouseEnter={onMouseEnter}>
               <BannerContent img="/src/assets/images/banner1.PNG" onMouseEnter={onMouseEnter}/>
               <BannerContent img="/src/assets/images/banner2.PNG" />
               <BannerContent img="/src/assets/images/banner3.PNG" />
            </Slider>
         </Container>
      </>
   );
}

export default Banner;

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
const Gamesslider = () => {
  const responsive = {
   
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 768, min: 390 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 390, min: 0 },
      items: 3,
    },
  };


  return (
    <>
      <MainContainer className="container mx-0 mx-md-0">
        <Wrapper className="row justify-content-center">
          

              <Wrapper className="row justify-content-center" style={{borderRadius:"14px"}}>
             
              <Carousel
                responsive={responsive}
                className="py-3"
                infinite
                removeArrowOnDeviceType={["tablet", "desktop","mobile"]}
                autoPlay
                autoPlaySpeed={3000}
               
              >
               <div className="gamesslider">
                <a href="#" className="games">Hockey Gear</a>
               </div>
               <div className="gamesslider">
                <a href="#" className="games">Hockey Gear</a>
               </div>
               <div className="gamesslider">
                <a href="#" className="games">Hockey Gear</a>
               </div>
               <div className="gamesslider">
                <a href="#" className="games">Hockey Gear</a>
               </div>
               <div className="gamesslider">
                <a href="#" className="games">Hockey Gear</a>
               </div>
               <div className="gamesslider">
                <a href="#" className="games">Hockey Gear</a>
               </div>
               <div className="gamesslider">
                <a href="#" className="games">Hockey Gear</a>
               </div>
                
                
                
               
               
              </Carousel>
              </Wrapper>
        </Wrapper>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div``;
const Wrapper = styled.div``;



export default Gamesslider;

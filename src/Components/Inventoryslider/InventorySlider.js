import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
const InventorySlider = () => {
  const responsive = {
   
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 768, min: 350 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 350, min: 0 },
      items: 3,
    },
  };
  const singleslideresponsive = {
   
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 768, min: 350 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 350, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <MainContainer className="container mx-0 mx-md-0 invertoryslider">
        <Wrapper className="row justify-content-center collectionslieders">
          
              <Carousel
                responsive={responsive}
                className="py-3"
                infinite
                removeArrowOnDeviceType={["tablet", "desktop","mobile"]}
                autoPlay
                autoPlaySpeed={3000}
              >
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection1</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection2</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection3</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection4</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection5</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection6</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection7</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection8</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection9</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection10</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection11</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection12</h4>
                </div>
                <div>
                  <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                  <h4>Collection13</h4>
                </div>
                
                
               
               
              </Carousel>

              <Wrapper className="row justify-content-center " style={{borderRadius:"14px"}}>
              <Carousel
                responsive={singleslideresponsive}
                className="py-3"
                infinite
                removeArrowOnDeviceType={["tablet", "desktop","mobile"]}
                autoPlay
                autoPlaySpeed={3000}
               
              >
                
                <div className="singleslide ps-2" style={{maxWidth:"1320px"}}>
                  <div>
                  <img src="https://images.pexels.com/photos/2952871/pexels-photo-2952871.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className=" d-block m-auto" />
                  <h4 className="text-center">Collection1</h4>
                  </div>
                </div>
                {/* <div className="singleslide" style={{maxWidth:"1320px"}}>
                  <img src="https://images.pexels.com/photos/2952871/pexels-photo-2952871.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className=" d-block m-auto" />
                  <h4 className="text-center">Collection2</h4>
                </div>
                <div className="singleslide" style={{maxWidth:"1320px"}}>
                  <img src="https://images.pexels.com/photos/2952871/pexels-photo-2952871.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className=" d-block m-auto" />
                  <h4 className="text-center">Collection3</h4>
                </div> */}
                
                
                
               
               
              </Carousel>
              </Wrapper>
        </Wrapper>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div``;
const Wrapper = styled.div``;
const CardImage = styled.img`
width: 100%;
height: auto;
border-radius: 12px;
`;
const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  max-width: 90%;
  height: 220px;
    color: white;
    display: flex;
    align-items: end;
    padding: 25px;
  /* @media (max-width: 470px){
  max-width: 60%;
  margin: auto;
  } */
`;

export default InventorySlider;

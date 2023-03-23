import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
const Slider2 = () => {
  const responsive = {
   
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 350 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 350, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <MainContainer className="container px-0 px-md-0">
        <Wrapper className="row justify-content-center">
          
              <Carousel
                responsive={responsive}
                className="py-5"
                infinite
                removeArrowOnDeviceType={["tablet", "desktop","mobile"]}
                autoPlay
                autoPlaySpeed={3000}
              >
                <Card style={{ background: "url( https://images.pexels.com/photos/1349515/pexels-photo-1349515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"}}>
                 
                <p className="Cardtitle">Market Place</p>
                </Card>
                <Card style={{ background: "url(https://images.pexels.com/photos/1349959/pexels-photo-1349959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"}}>
                 
                <p className="Cardtitle">Events</p>
                </Card>
                <Link to ="/maininventory"> <Card style={{ background: "url(https://images.pexels.com/photos/1476146/pexels-photo-1476146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"}}>
                 
                <p className="Cardtitle">Iventory</p>
                </Card></Link>
                
                
               
               
              </Carousel>
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

export default Slider2;

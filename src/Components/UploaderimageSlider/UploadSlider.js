import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
const UploadSlider = () => {
  const responsive = {
   
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 370 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 370, min: 0 },
      items: 2,
    },
  };

  return (
    <>
      <MainContainer className="container px-0 px-md-0">
        <Wrapper className="row justify-content-center">
          
              <Carousel
                responsive={responsive}
                className="py-3"
                infinite
                removeArrowOnDeviceType={["tablet", "desktop","mobile"]}
                // autoPlay
                autoPlaySpeed={2000}
              >
                <Card style={{ background: "url(https://www.profootballnetwork.com/wp-content/uploads/2023/01/lamar-jackson-landing-spots-dolphins-jets-saints-headline-potential-suitors-696x463.jpg",backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"}}>
                 
                <p className="Cardtitles">1</p>
                </Card>
                <Card style={{ background: "url(https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80)",backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"}}>
                 
                <p className="Cardtitles">2</p>
                </Card>
                <Card style={{ background: "url(https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"}}>
                 
                <p className="Cardtitles">3</p>
                </Card>
                <Card style={{ background: "url(https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80)",backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"}}>
                 
                <p className="Cardtitles">4</p>
                </Card>
                <Card style={{ background: "url(https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"}}>
                 
                <p className="Cardtitles">5</p>
                </Card>
            
                
               
               
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
    padding-left: 25px;
  /* @media (max-width: 470px){
  max-width: 60%;
  margin: auto;
  } */
`;

export default UploadSlider;

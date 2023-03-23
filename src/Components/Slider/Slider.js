import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Slider = () => {
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
            removeArrowOnDeviceType={["tablet", "desktop", "mobile"]}
            autoPlay
            autoPlaySpeed={2000}
          >
            <Link to="/maininventory">
              <Card
                style={{
                  background:
                    "url(https://images.pexels.com/photos/9399540/pexels-photo-9399540.jpeg?auto=compress&cs=tinysrgb&w=600)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <p className="Cardtitle">Inventory</p>
              </Card>
            </Link>
            <Card
              style={{
                background:
                  "url( https://images.pexels.com/photos/159516/soccer-goal-keeper-player-kick-159516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <p className="Cardtitle">Events</p>
            </Card>
            <Card
              style={{
                background:
                  "url( https://images.pexels.com/photos/1618290/pexels-photo-1618290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <p className="Cardtitle">Games</p>
            </Card>
           
          </Carousel>
        </Wrapper>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div``;
const Wrapper = styled.div``;

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

export default Slider;

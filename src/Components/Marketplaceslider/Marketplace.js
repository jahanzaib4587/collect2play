import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";
const Marketplace = () => {
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
      <MainContainer className="container mx-0 mx-md-0 marketplaceslider">
        <Wrapper className="row justify-content-center">
          <Wrapper
            className="row justify-content-center"
            style={{ borderRadius: "14px" }}
          >
            <Carousel
              responsive={singleslideresponsive}
              className="py-3"
              infinite
              removeArrowOnDeviceType={["tablet", "desktop", "mobile"]}
              autoPlay
              autoPlaySpeed={3000}
            >
              <div className="marketplaceslide" style={{ maxWidth: "1320px" }}>
                <div className="userdetails">
                  <img
                    src={process.env.PUBLIC_URL + "/images/Oval (1).png"}
                    alt=""
                  />
                  <div className="ps-2">
                    <p>Baseball Mitt</p>
                    <br />
                    <p>Thomas.R</p>
                  </div>
                </div>
              </div>
              <div className="marketplaceslide" style={{ maxWidth: "1320px" }}>
                <div className="userdetails">
                  <img
                    src={process.env.PUBLIC_URL + "/images/Oval (1).png"}
                    alt=""
                  />
                  <div className="ps-2">
                    <p>Baseball Mitt</p>
                    <br />
                    <p>Thomas.R</p>
                  </div>
                </div>
              </div>
              <div className="marketplaceslide" style={{ maxWidth: "1320px" }}>
                <div className="userdetails">
                  <img
                    src={process.env.PUBLIC_URL + "/images/Oval (1).png"}
                    alt=""
                  />
                  <div className="ps-2">
                    <p>Baseball Mitt</p>
                    <br />
                    <p>Thomas.R</p>
                  </div>
                </div>
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

export default Marketplace;

import React from 'react'
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
const BlackFooter = () => {
  return (
    <>
     <FooterContainer>
    <ContainerWrapper className='container'>
    <WrapperRow className='row justify-content-center'>
    <LogoImage className = "col-12">
        <Image className='ps-4 d-block my-4 m-auto img-fluid' src={process.env.PUBLIC_URL + '/images/star.png'} style = {{width:"80px"}}/>
          </LogoImage>
          <hr className='hr_line' />
          
    </WrapperRow>
    </ContainerWrapper>
    </FooterContainer>
          
    </>

  )
}
const LogoImage = styled.div`
             
`
const FooterContainer = styled.div`
background: #1D1D22;
box-shadow: 0px -2px 26px rgba(131, 131, 131, 0.25);      
`
const ContainerWrapper = styled.div`
 
`
const WrapperRow = styled.div`
             
`
export default BlackFooter

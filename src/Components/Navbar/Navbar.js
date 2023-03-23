import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from 'react-bootstrap/Form';
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRef, useEffect } from 'react';
import "./Navbar.css";
import { useState } from "react";
const BlackNavbar = () => {
  const [mobilemenu, setMobilemenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [mobilesearch, setMobileSearch] = useState(false);
  const ref = useRef(null);
  const searchref = useRef(null);
  const mobile = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
       setMobilemenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  useEffect(() => {
    function handleClickOutsidsesearch(event) {
      if (searchref.current && !searchref.current.contains(event.target)) {
       setSearch(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutsidsesearch);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutsidsesearch);
    };
  }, [searchref]);
  useEffect(() => {
    function searchmobile(event) {
      if (mobile.current && !mobile.current.contains(event.target)) {
       setMobileSearch(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', searchmobile);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', searchmobile);
    };
  }, [mobile]);

  return (
    <>
      <Navbar expand="lg" className='blackbg'>
    <Container>
    <Navbar.Toggle aria-controls="navbarScroll" className='fas fa-bars text-white ps-3' onClick={()=>setMobilemenu(true)} />
    <LinkContainer to="/home">
      <Navbar.Brand className="d-none d-md-block">
        <Image src={process.env.PUBLIC_URL + '/images/Collect 2 Play Logo_web.png'} style ={{width:"70px"}}/></Navbar.Brand></LinkContainer>
        {mobilesearch && <>
          <div className="d-flex d-md-none justify-content-center" >
          <input type="search" placeholder="Search..." className="searching_input" style={{position:"absolute"}}/></div>
          </>}
      <div className="d-flex pe-4" >
      
      <Image className='ps-3 p-lg-4 d-block d-lg-none' onClick={()=>setMobileSearch(!mobilesearch)} src={process.env.PUBLIC_URL + '/images/CompositeLayer.png'} style = {{cursor:"pointer"}}/>
      <Image className='ps-3 p-lg-4 d-block d-lg-none' src={process.env.PUBLIC_URL + '/images/CompositeLayer (1).png'}/>
        {/* <Image className='ps-3 p-lg-4 d-block d-lg-none' src={process.env.PUBLIC_URL + '/images/path.png'}/> */}
      </div>
      <Navbar.Collapse id="navbarScroll" className="d-none d-md-block">
        <Nav className="m-auto my-2 maxheight navlinks my-lg-0" navbarScroll >
        <LinkContainer to="/maininventory">
          <Nav.Link href="#action1"className="text-white" >Inventory</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/bobs_collection">
          <Nav.Link href="#action2" className="text-white" >Collection</Nav.Link>
          </LinkContainer>
          <Nav.Link href="#action2" className="text-white" > Shop</Nav.Link>
          <Nav.Link href="#action2" className="text-white" > About us </Nav.Link>
          
          <LinkContainer to="/login">
          <Nav.Link className="text-white" >Login</Nav.Link>
  </LinkContainer>
        </Nav>
        <Form className="d-flex"  ref={searchref}>
          {search && <>
          <div>
          <input type="search" placeholder="Search..." className="searching_input" style={{position:"absolute"}}/></div>
          </>}
        <Image className='ps-4 d-none d-lg-block' onClick={()=>setSearch(!search)} src={process.env.PUBLIC_URL + '/images/CompositeLayer.png'} style = {{cursor:"pointer"}}/>
        </Form>
        <Image className='ps-4 d-none d-lg-block' src={process.env.PUBLIC_URL + '/images/CompositeLayer (1).png'}/>
        <Image className='ps-4 d-none d-lg-block' src={process.env.PUBLIC_URL + '/images/path.png'}/>
      </Navbar.Collapse>
      
      
    </Container>
  </Navbar>
  {mobilemenu && <div  className="row justify-content-center w-100 d-block d-md-none" style={{position:"fixed", zIndex:"11111111", marginTop:"-45px"}}>
          <div className="col-10 text-center usersec pe-0" ref={ref}>
            <div className="py-4" style={{background:"#101010"}}>
            <i
              class="fa fa-user-circle text-white manusericon"
              aria-hidden="true"
            ></i>
            <h5 className="mt-2 text-white azad">
              Trace@gmail.com
            </h5>
            </div>
          <Link to = "/maininventory">
            <div className="ms-3 text-start mt-4 basc">
              <i class="fa fa-home me-3 " aria-hidden="true"></i>My Inventory
            </div>
            </Link>
            <Link to = "/bobs_collection">
            <div className="ms-3 text-start mt-4 basc">
              <i class="fas fa-calendar-week me-3 " aria-hidden="true"></i>Collection
            </div>
            </Link>
            <div className="ms-3 text-start mt-4 basc">
              <i class="fas fa-gamepad me-3 " aria-hidden="true"></i>Games
             
            </div>
            <div className="ms-3 text-start mt-4 basc">
              <i class="fas fa-poll me-3 " aria-hidden="true"></i>Market Place
            
            </div>
           <Link to = "/login">
           <div className="ms-3 text-start mt-4 basc">
              <i class="fas fa-user-circle me-3 " aria-hidden="true"></i>Login
              
            </div>
           </Link>
            <div className="ms-3 text-start mt-4 basc">
              <i class="fas fa-key me-3 " aria-hidden="true"></i>Get
              Licensed

            </div>
            <div className="ms-3 text-start mt-4 basc">
              <i class="far fa-bell me-3 " aria-hidden="true"></i>Notification
            </div>
            <div className="ms-3 text-start mt-4 basc">
              <i class="fas fa-users me-3 " aria-hidden="true"></i>Followers
            </div>
            <div className="ms-3 text-start mt-4 basc">
              <i class="fas fa-undo mb-3 me-3 " aria-hidden="true"></i>
              Play History
            </div>
            <div className="ms-3 text-start mt-2 basc">
              <i class="fas fa-sign-out-alt mb-4 me-3 " aria-hidden="true"></i>
              Logout
            </div>
          </div>
        </div>}
    </>
  );
};
const SearchIcon = styled.i`
  @media (max-width: 768px) {
    margin-left: 20px;
    margin-bottom: 15px;
  }
`;
export default BlackNavbar;

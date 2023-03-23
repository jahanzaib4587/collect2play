import React from 'react'
import BlackFooter from '../../Components/Footer/Footer'
import BlackNavbar from '../../Components/Navbar/Navbar'
import Slider from '../../Components/Slider/Slider'
import Slider2 from '../../Components/Slider/Slider2'
import './Home.css'
import { useState, useEffect } from 'react';
const Home = () => {
  const date = new Date();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  return (
    <>
      <BlackNavbar />
      <div className='backgroundcolor'>
<div className="container">
  <div className="row py-3">
  <div>
  <select name="" id="">
    <option value="" selected>Trending</option>
    <option value="">Live</option>
  </select>
  
  <span className='float-end' style={{color:"#939393"}}> <span className='px-1' style={{borderRight:"2px solid #939393"}}>{date.toLocaleDateString()}</span> <span className='px-1'>{displayHours}:{displayMinutes} {ampm}</span></span>
</div>
  </div>
</div>

      <div className='bgbanner '>
     <div className="container">
      <div className="row justify-content-center d-flex align-items-center ">
<div className="col-md-6 text-start text-md-center">
  <h2>Live- Football</h2>
  <h2>Patroits & Ravens</h2>
  <div className='mt-4'>
  <button className='btn btn-small btn-danger text-white px-3' type='button'>Live</button>
  <span className='ps-2 pe-3'>.</span> <span>16k Views</span>
  </div>
</div>
      </div>
     </div>
     </div>

     <div className="container whereto">
<div className="row">
  <div className="col-12">
    <h2>Where To?</h2>
    <div className='main_profile align-self-center'>
      <h3>Main Profile</h3>
    </div>
    <Slider />
<Slider2 />

  </div>
</div>
     </div>

     </div>
      <BlackFooter />
    </>
  )
}


export default Home

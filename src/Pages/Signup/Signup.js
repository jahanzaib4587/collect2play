import React from 'react'
import './Signup.css'
const Signup = () => {
  return (
    <>
      <div className="signup_Background">
        <div className="container">
          <div className="row Wrapper align-items-center justify-content-center">
            <div className="col-md-6 px-3">
              <img src={process.env.PUBLIC_URL + '/images/star.png'} alt="" className='d-block m-auto' />
              <h1>Register</h1>
              <input type="text" placeholder='Email' className='mb-4' />
              <button type='submit' className='enterbutton'>Enter</button>
              <div className="row justify-content-center">
                <div className="col-5 mt-4"><hr className='text-white' /></div>
                <div className="col-2 col-md-1 mt-4 text-center"><span className='w-100'>Or</span></div>
                <div className="col-5 mt-4"><hr className='text-white' /></div>
              </div>
              <button type='submit' className='QR_code'><span>Scan QR Code</span></button>


            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup

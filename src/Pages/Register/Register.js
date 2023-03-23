import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { Switch } from 'antd';
const Register = () => {

const [hideshowemail, setHideshowEmail] = useState(true);
const [hideshowphone, setHideshowPhone] = useState(false);
const [OTP, setOTP] = useState(false);
function handleClick() {
   setHideshowEmail(!hideshowemail);
  }
  function handleOtherClick() {
    setHideshowPhone(!hideshowphone)
  }
  function otpfield() {
    setOTP(!OTP)
  }
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
      };
  return (
    <>
      <div className="login_Background">
        <div className="container">
          <form >
            <div className="row Wrapper align-items-center justify-content-center">
              <div className="col-md-6 px-3">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/Collect 2 Play Logo_mobile.png"
                  }
                  alt=""
                  className="d-block m-auto"
                />
                <h1>Registration</h1>
               {hideshowemail && <input
                  type="email"
                  placeholder="Email"
                 
                />}
                
         {hideshowphone && <input
                  type="text"
                  placeholder="Cell Phone"
                />}
                
                {/* <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /> */}
                        <Input.Password
                       
        placeholder="Password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
       {OTP && <input
                  type="text"
                  placeholder="OTP"
                 
                />}
      <Switch  onChange={onChange} className ="mt-4"
      onClick={()=>{handleClick(); handleOtherClick(); otpfield();}}
      />
                {/* <span className="float-end py-3">Forgot Password?</span> */}
                <button type="submit" className="signinbutton mt-4">
                  Register
                </button>
                <button type="submit" className="guest continue">
                  Continue as Guest
                </button>
                <div className="row justify-content-center">
                  <div className="col-5 mt-3 mt-md-4">
                    <hr className="text-white" />
                  </div>
                  <div className="col-2 col-md-1 mt-3 mt-md-4 text-center">
                    <span className="w-100 mt-3 mt-md-4 ">Or</span>
                  </div>
                  <div className="col-5 mt-3 mt-md-4 ">
                    <hr className="text-white" />
                  </div>
                </div>
                <button type="submit" className="twitteruser">
                  <i class="fab float-start fa-twitter"></i>
                  <span>Continue as Twitter</span>
                </button>
                <div className="row">
                  <div className="col-6">
                    <button type="submit" className="twitteruser">
                      <i class="fab float-start fa-google"></i>
                      <span>Google</span>
                    </button>
                  </div>
                  <div className="col-6">
                    <button type="submit" className="twitteruser">
                      <i class="fab float-start fa-facebook"></i>
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>
                <div className="col-12 py-3 text-center">
                  <span>Already have an account! </span>
                  <Link to="/login">
                    <span className="text-white ps-2">Login</span>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

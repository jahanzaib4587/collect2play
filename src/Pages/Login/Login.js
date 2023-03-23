import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { Switch } from "antd";
const Login = () => {
  const [hideshowemail, setHideshowEmail] = useState(true);
  const [hideshowphone, setHideshowPhone] = useState(false);

  function handleClick() {
    setHideshowEmail(!hideshowemail);
  }
  function handleOtherClick() {
    setHideshowPhone(!hideshowphone);
  }

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <>
      <div className="login_Background">
        <div className="container">
          <form>
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
                <h1>Login</h1>
                {hideshowemail && <input type="email" placeholder="Email" />}

                {hideshowphone && <input type="text" placeholder="Cell Phone" /> }

                {/* <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /> */}
                <Input.Password
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />

                <div className="mt-3">
                  <Switch
                    onChange={onChange}
                    onClick={() => {
                      handleClick();
                      handleOtherClick();
                    }} />
                  <span className="float-end">Forgot Password?</span>
                </div>
                <Link to="/home">
                  <button type="submit" className="signinbutton mt-4">
                    Login
                  </button>
                </Link>
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
                  <span>Don't have an account! </span>
                  <Link to="/sign_up">
                    <span className="text-white ps-2">Sign Up</span>
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

export default Login;

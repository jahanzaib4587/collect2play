import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { Switch } from "antd";
import { apiCall } from "../../Api/ApiCall";

const Login = () => {
  const navigate = useNavigate();
  const [hideshowemail, setHideshowEmail] = useState(true);
  const [hideshowphone, setHideshowPhone] = useState(false);
  const firebase_relay_id = "ifV6F0TgYgXDqybVfJylNYHzwdD2";

  function handleClick() {
    setHideshowEmail(!hideshowemail);
  }
  function handleOtherClick() {
    setHideshowPhone(!hideshowphone);
  }

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  function handleSubmit() {
    localStorage.setItem("access_token", "responseData.access_token");
    navigate("/");
    // const apiUrl =
    //   "https://console.collect2play.com/api/auth/user_by_firebase_relay_id";
    // const apiHeaders = {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    //   "Access-Control-Allow-Headers": "Content-Type, Authorization",
    // };
    // const apiData = {
    //   firebase_relay: firebase_relay_id,
    // };

    // apiCall("POST", apiUrl, apiHeaders, apiData)
    //   .then((responseData) => {
    //     localStorage.setItem("access_token", responseData.access_token);
    //     navigate("/");
    //     console.log(responseData);
    //   })
    //   .catch((error) => console.error(error));
  }
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

                {hideshowphone && (
                  <input type="text" placeholder="Cell Phone" />
                )}

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
                    }}
                  />
                  <span className="float-end">Forgot Password?</span>
                </div>
                {/* <Link to="/home"> */}
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="signinbutton mt-4"
                >
                  Login
                </button>
                {/* </Link> */}
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

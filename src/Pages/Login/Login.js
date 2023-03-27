import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Alert } from "antd";
import { Switch } from "antd";
import { apiCall } from "../../Api/ApiCall";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import './Login.css';
import { motion } from "framer-motion";


const Login = () => {
  const navigate = useNavigate();
  const [hideshowemail, setHideshowEmail] = useState(true);
  const [hideshowphone, setHideshowPhone] = useState(false);
  const [showNotification, setShowNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('abc')
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationType, setNotificationType] = useState('success')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const firebase_relay_id = "ifV6F0TgYgXDqybVfJylNYHzwdD2";
  const [isSignup, setIsSignup] = useState(false)
  const [OTP, setOTP] = useState(false);


  function otpfield() {
    setOTP(!OTP)
  }
  const firebaseConfig = {
    apiKey: "AIzaSyBtZcEG4vcJHBa3UlDEtPpTJ3D5TNpkzAs",
    authDomain: "collect2play-5c3d4.firebaseapp.com",
    databaseURL: "https://collect2play-5c3d4-default-rtdb.firebaseio.com",
    projectId: "collect2play-5c3d4",
    storageBucket: "collect2play-5c3d4.appspot.com",
    messagingSenderId: "432235957600",
    appId: "1:432235957600:web:f3c383932428a00cec2205",
    measurementId: "G-WY68V7QXMR"
  };
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => {
        setShowNotification(false);
        setNotificationText('')
      }, 3000);
    }
    return () => {
    };
  }, [showNotification]);

  const handleGoogleSignIn = async () => {

    signInWithRedirect(auth, provider)
      .then(() => {
        return getRedirectResult(auth);
      })
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("access_token", token);

        // The signed-in user info.
        const user = result.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        setNotificationText(error.message)
        setShowNotification(true)
        setNotificationType('error')
        // Handle errors here.
        console.log(error);
      });
  };

  const handleSignIn = (event) => {
    debugger
    event.preventDefault();
    setIsLoading(true);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("access_token", user.accessToken);
        console.log(user);
        navigate("/");
        // Do something with the signed-in user, e.g. navigate to home page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        setNotificationText(error.message)
        setShowNotification(true)
        setNotificationType('error')
        setIsLoading(false);
      });
  };



  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setNotificationText(error.message)
        setNotificationType('error')
        setShowNotification(true)
        // Handle sign-up errors here
        console.log(error);
      });
  };


  const apiData = {
    firebase_relay: firebase_relay_id,
  };

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
    fetch('https://console.collect2play.com/api/auth/user_by_firebase_relay_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)

        // setIsLoading(false);
        // localStorage.setItem("access_token", data.id);
        // setData(data);
        // navigate("/");
      })
      .catch(error => {
        console.log(error)
        // setIsLoading(false);
        // setError(error);
      });
  }


  return (
    <>
      <div className="login_Background">
        <div className="container">

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
              <h1>{!isSignup ? "Register" : "Log in"}</h1>
              <form>
                {showNotification && notificationText && (
                  <Alert message={notificationText} type={notificationType} showIcon />
                )}
                <motion.div
                  initial={{ opacity: 0, marginBottom: 0 }}
                  animate={{
                    opacity: showNotification ? 1 : 0,
                    marginBottom: showNotification ? 20 : 0,
                  }}
                >
                  {showNotification && notificationText && (
                    <Alert message={notificationText} type={notificationType} showIcon />
                  )}
                </motion.div>

                {hideshowemail && <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />}

                {hideshowphone && (
                  <input type="text" placeholder="Cell Phone" />
                )}

                <Input.Password
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                {OTP && <input
                  type="text"
                  placeholder="OTP"

                />}
                <div className="mt-3">
                  <Switch onChange={onChange} className="mt-4"
                    onClick={() => { handleClick(); handleOtherClick(); otpfield(); }}
                  />
                  <span className="float-end">Forgot Password?</span>
                </div>
                {/* <Link to="/home"> */}
                <button
                  onClick={() => { !isSignup ? handleSignUp() : handleSignIn() }}
                  type="submit"
                  className="signinbutton mt-4"
                >
                  {!isSignup ? "Register" : "Log in"}
                </button>
              </form>
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
                    <span onClick={handleGoogleSignIn}>Google</span>
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
                <span>{isSignup ? "Don't have an account!" : "Already have an account!"} </span>
                {/* <Link to="/sign_up"> */}
                <span style={{ cursor: ' pointer' }} className="text-white ps-2" onClick={() => setIsSignup(!isSignup)}>{isSignup ? "Sign Up" : "Log in"}</span>
                {/* </Link> */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;




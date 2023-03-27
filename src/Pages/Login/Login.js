import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Alert, Form } from "antd";
import { Switch } from "antd";
import { apiCall } from "../../Api/ApiCall";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider
} from "firebase/auth";
import firebaseConfig from "../../Firebase/Firebase";
import "./Login.css";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [hideshowemail, setHideshowEmail] = useState(true);
  const [hideshowphone, setHideshowPhone] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("abc");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationType, setNotificationType] = useState("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase_relay_id = "ifV6F0TgYgXDqybVfJylNYHzwdD2";
  const [isSignup, setIsSignup] = useState(true);
  const [OTP, setOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();

  const [form] = Form.useForm();

  function otpfield() {
    setOTP(!OTP);
  }

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => {
        setShowNotification(false);
        setNotificationText("");
      }, 3000);
    }
    return () => { };
  }, [showNotification]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem("access_token", token);
      const user = result.user;
      window.location.href = "/";
      console.log(token, user);
    } catch (error) {
      const friendlyErrorMessage = getFriendlyErrorMessage(error);
      setNotificationText(friendlyErrorMessage);
      setShowNotification(true);

      console.log(error);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = result.credential.accessToken;
      const user = result.user;
      localStorage.setItem("access_token", token);
      window.location.href = "/"
      console.log(token, user);
    } catch (error) {
      const friendlyErrorMessage = getFriendlyErrorMessage(error);
      setNotificationText(friendlyErrorMessage);
      setShowNotification(true);
    }
  };


  const handleTwitterSignIn = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = result.credential.accessToken;
      const user = result.user;
      localStorage.setItem("access_token", token);
      window.location.href = "/"
      console.log(token, user);
    } catch (error) {
      const friendlyErrorMessage = getFriendlyErrorMessage(error);
      setNotificationText(friendlyErrorMessage);
      setShowNotification(true);

      console.log(error);
    }
  };
  const handleSignIn = (event) => {
    form
      .validateFields()
      .then(() => {
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("access_token", user.accessToken);
            console.log(user);
            window.location.href = "/";
            // navigate("/home");
            // Do something with the signed-in user, e.g. navigate to home page
          })
          .catch((error) => {
            const friendlyErrorMessage = getFriendlyErrorMessage(error);
            setNotificationText(friendlyErrorMessage);

            setShowNotification(true);
            setNotificationType("error");
            setIsLoading(false);
          });
      })
      .catch(() => { });
  };

  const handleSignUp = () => {
    form
      .validateFields()
      .then(() => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            localStorage.setItem("access_token", user.accessToken);
            console.log(user);
            window.location.href = "/";
          })
          .catch((error) => {
            const friendlyErrorMessage = getFriendlyErrorMessage(error);
            setNotificationText(friendlyErrorMessage);
            setNotificationType("error");
            setShowNotification(true);
            // Handle sign-up errors here
            console.log(error);
          });
      })
      .catch(() => { });
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
    fetch(
      "https://console.collect2play.com/api/auth/user_by_firebase_relay_id",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        // setIsLoading(false);
        // localStorage.setItem("access_token", data.id);
        // setData(data);
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
        // setError(error);
      });
  }
  function getFriendlyErrorMessage(error) {
    switch (error.code) {
      case "auth/wrong-password":
        return "Password is incorrect.";
      case "auth/user-not-found":
        return "User not found.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      case "auth/email-already-in-use":
        return "Email already in use. Please try another email.";
      // Add more cases for other error codes as needed
      default:
        return "An error occurred. Please try again.";
    }
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
              <Form form={form}>
                <motion.div
                  initial={{ opacity: 0, marginBottom: 0 }}
                  animate={{
                    opacity: showNotification ? 1 : 0,
                    marginBottom: showNotification ? 20 : 0,
                  }}
                >
                  {showNotification && notificationText && (
                    <Alert
                      message={notificationText}
                      type={notificationType}
                      showIcon
                    />
                  )}
                </motion.div>

                {hideshowemail && (
                  <Form.Item
                    name="email"
                    type="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please enter a valid Email Address",
                      },
                      {
                        whitespace: true,
                        required: true,
                        message: "Please enter the Email",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                )}

                {hideshowphone && (
                  <Form.Item
                    name="phone-number"
                    rules={[
                      {
                        whitespace: true,
                        required: true,
                        message: "Please enter the phone number",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Cell Phone"
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </Form.Item>
                )}

                <Form.Item
                  name="password"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: "Please enter the password",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                {OTP && <input type="text" placeholder="OTP" />}
                <div className="mt-3">
                  <Switch
                    onChange={onChange}
                    className="mt-4"
                    onClick={() => {
                      handleClick();
                      handleOtherClick();
                      otpfield();
                    }}
                  />
                  <span className="float-end">Forgot Password?</span>
                </div>
                {/* <Link to="/home"> */}
                <button
                  onClick={() => {
                    !isSignup ? handleSignUp() : handleSignIn();
                  }}
                  // type="submit"
                  disabled={isLoading}
                  className="signinbutton mt-4"
                >
                  {!isSignup ? "Register" : "Log in"}
                  <span
                    className={
                      isLoading && `spinner-border spinner-border-sm mx-2`
                    }
                  ></span>
                </button>
              </Form>
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
              <button onClick={() => handleTwitterSignIn()} className="twitteruser">
                <i class="fab float-start fa-twitter"></i>
                <span>Continue as Twitter</span>
              </button>
              <div className="row">
                <div className="col-6">
                  <button
                    onClick={() => {
                      handleGoogleSignIn();
                    }}
                    className="twitteruser"
                  >
                    <i class="fab float-start fa-google"></i>
                    <span>Google</span>
                  </button>
                </div>
                <div className="col-6">
                  <button onClick={() => handleFacebookSignIn()} className="twitteruser">
                    <i class="fab float-start fa-facebook"></i>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
              <div className="col-12 py-3 text-center">
                <span>
                  {isSignup
                    ? "Don't have an account!"
                    : "Already have an account!"}{" "}
                </span>
                {/* <Link to="/sign_up"> */}
                <span
                  style={{ cursor: " pointer" }}
                  className="text-white ps-2"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  {isSignup ? "Sign Up" : "Log in"}
                </span>
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

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import PhoneInput from 'react-phone-number-input'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Alert, Form } from "antd";
import { Switch } from "antd";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  sendEmailVerification
} from "firebase/auth";
import firebaseConfig from "../../Firebase/Firebase";
import "./Login.css";
import { motion } from "framer-motion";
import { getFriendlyErrorMessage } from "../../Components/Utilities/Utilities";

const Login = () => {
  const [hideshowemail, setHideshowEmail] = useState(true);
  const [hideshowphone, setHideshowPhone] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("abc");
  const [isLoading, setIsLoading] = useState(false);
  const [notificationType, setNotificationType] = useState("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase_relay_id = "ifV6F0TgYgXDqybVfJylNYHzwdD2";
  const [isSignup, setIsSignup] = useState(true);
  const [OTP, setOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [phone, setPhone] = useState('');

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

        if (notificationText === "Please verify your email before signing in.") {
          window.location.href = "/resend_verification_email";
        }
      }, 2000);
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
      handleNotification(getFriendlyErrorMessage(error));

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
      window.location.href = "/";
      console.log(token, user);
    } catch (error) {
      handleNotification(getFriendlyErrorMessage(error));
    }
  };

  const handleTwitterSignIn = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = result.credential.accessToken;
      const user = result.user;
      localStorage.setItem("access_token", token);
      window.location.href = "/";
      console.log(token, user);
    } catch (error) {
      handleNotification(getFriendlyErrorMessage(error));

      console.log(error);
    }
  };
  const handleSignIn = (event) => {
    form
      .validateFields()
      .then(() => {
        setIsLoading(true);

        // Check if the user's email is verified before signing in


        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
              debugger
              localStorage.setItem("access_token", user.accessToken);
              console.log(user);
              window.location.href = "/";
            }
            else {
              // User's email has not been verified

              handleNotification("Please verify your email before signing in.");

            }
          })
          .catch((error) => {
            handleNotification(getFriendlyErrorMessage(error));
          });

      })
      .catch(() => { });
  };


  const handleSignUp = () => {
    form.validateFields().then(() => {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up successfully
          const user = userCredential.user;
          sendEmailVerification(user)
            .then(() => {
              // Verification email sent successfully
              handleNotification("Please check your email to verify your account.", "success");
              setIsSignup(true)
            })
            .catch((error) => {
              handleNotification(getFriendlyErrorMessage(error));

              // Handle email verification errors here
              console.log(error);
            });
        })
        .catch((error) => {
          handleNotification(getFriendlyErrorMessage(error));

          // Handle sign-up errors here
          console.log(error);
        });
    }).catch(() => { });
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

    form.resetFields();
    setEmail("");
    setPassword("");
    setPhoneNumber(null);
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
  useEffect(() => {
    form.resetFields();
    setEmail("");
    setPassword("");
    setPhoneNumber(null);
  }, [isSignup])


  function handleNotification(message, type = "error") {
    setNotificationText(message);
    setNotificationType(type);
    setShowNotification(true);
    setIsLoading(false);
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
              <h1 className="mb-4">{!isSignup ? "Register" : "Log in"}</h1>
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
                 <PhoneInput
                 inputProps={{
                   name: 'phone',
                   required: true,
                   autoFocus: true,
                 }}
                 value={phone}
                countryCodeEditable ={false}
                 inputStyle={{
                  paddingTop: 35,
                  paddingRight: 14,
                  paddingBottom: 35,
                 paddingLeft:50
                
                }}
               
                 country={'us'}
                 className= "w-100 phonenumber_field countries"
                 inputClass = "contact_field"
               />
                  // <Form.Item
                  //   name="phone-number"
                  //   rules={[
                  //     {
                  //       whitespace: true,
                  //       required: true,
                  //       message: "Please enter the phone number",
                  //     },
                  //   ]}
                  // >
                  //   <Input
                  //     type="number"
                  //     placeholder="Cell Phone"
                  //     onChange={(e) => {
                  //       setPhoneNumber(e.target.value);
                  //     }}
                  //   />
                  // </Form.Item>
                )
                }

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
                {OTP && <Form.Item
                  name="otp"
                  
                >
                  <Input.Password
                    placeholder="OTP"
                    // onChange={(e) => setPassword(e.target.value)}
                    iconRender={(e) =>
                      e = <a href="#" className ="getotp" style={{color:"#0d6efd !important"}}>GET OTP</a>
                    }
                  />
                </Form.Item>}
                <div className="mt-3">
                  <Switch
                    onChange={onChange}
                    // className="mt-4"
                    onClick={() => {
                      handleClick();
                      handleOtherClick();
                      otpfield();
                    }}
                  />/
                  <Link to="/forgot_password">
                    <span className="float-end">Forgot Password?</span>
                  </Link>
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
                      isLoading &&
                      `spinner-border spinner-border-sm mx-2 text-light`
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
              <button
                onClick={() => handleTwitterSignIn()}
                className="twitteruser"
              >
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
                  <button
                    onClick={() => handleFacebookSignIn()}
                    className="twitteruser"
                  >
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

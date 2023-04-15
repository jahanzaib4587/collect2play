import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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
  sendEmailVerification,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import firebaseConfig from "../../Firebase/Firebase";
import "./Login.css";
import { motion } from "framer-motion";
import { getFriendlyErrorMessage } from "../../Components/Utilities/Utilities";

const Login = () => {
  const [hideshowemail, setHideshowEmail] = useState(true);
  const [hideshowphone, setHideshowPhone] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("Norification");
  const [isLoading, setIsLoading] = useState(false);
  const [notificationType, setNotificationType] = useState("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [OTP, setOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState()

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

        if (
          notificationText === "Please verify your email before signing in."
        ) {
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
      if (result._tokenResponse.isNewUser) {
        const userApi = {
          firebase_relay: `${result.user.providerData[0].uid}`,
          email: result.user.email,
          c2p_user_role: 1,
        };
        handleSubmit(userApi, true);
      }
      else {
        handleFirebaseRelayIdSignIn(result.user.providerData[0].uid)
      }

    } catch (error) {
      handleNotification(getFriendlyErrorMessage(error));
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = result.user.accessToken;
      const user = result.user;
      localStorage.setItem("access_token", token);
      window.location.href = "/";
    } catch (error) {
      handleNotification(getFriendlyErrorMessage(error));
    }
  };

  const handleTwitterSignIn = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = result.user.accessToken;
      const user = result.user;
      localStorage.setItem("access_token", token);
      window.location.href = "/";
    } catch (error) {
      handleNotification(getFriendlyErrorMessage(error));
    }
  };
  const handleSignIn = () => {
    form
      .validateFields()
      .then(() => {
        fetch(`https://console.collect2play.com/api/auth/login?email=${email}&password=${password}`, {
          method: "POST",
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Network response was not ok");
            }
          })
          .then(data => {
            // Handle successful response
            if (data.status == 200) {
              localStorage.setItem("access_token", data.access_token);
              window.location.href = "/";
            }
            else {
              handleNotification(data.message);
            }
          })
          .catch(error => {
            // Handle error
            handleNotification(error);
          });

      });
  }

  const handlePhoneSignIn = () => {
    form
      .validateFields()
      .then(() => {
        fetch(`https://console.collect2play.com/api/auth/auth_by_phone_password`, {
          method: "POST",
          body: JSON.stringify({
            phone: phoneNumber,
            password: password,
            country_code: countryCode
          }),
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              handleNotification("Network response was not ok");
            }
          })
          .then(data => {
            // Handle successful response
            if (data.status == 200) {
              localStorage.setItem("access_token", data.access_token);
              window.location.href = "/";
            }
            else {
              handleNotification(data.message);
            }
          })
          .catch(error => {
            // Handle error
            handleNotification(error);
          });

      });
  }

  const handleFirebaseRelayIdSignIn = (firebase_relay) => {
    fetch(`  https://console.collect2play.com/api/auth/user_by_firebase_relay_id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebase_relay: firebase_relay
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          handleNotification("Network response was not ok");
        }
      })
      .then(data => {
        // Handle successful response
        if (data.status == 200) {
          localStorage.setItem("access_token", data.access_token);
          window.location.href = "/";
        }
        else {
          handleNotification(data.message);
        }
      })
      .catch(error => {
        // Handle error
        handleNotification(error);
      });


  }

  const handleSignUp = () => {
    form
      .validateFields()
      .then(() => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((credential) => {
            const user = credential.user;
            sendEmailVerification(user)
              .then(() => {
                handleNotification(
                  "Please check your email to verify your account.",
                  "success"
                );
                const userApi = {
                  firebase_relay: `${credential._tokenResponse.localId}`,
                  email: credential.user.email,
                  c2p_user_role: 1,
                  password: password,
                };
                handleSubmit(userApi);
                setIsSignup(true);
              })
              .catch((error) => {
                handleNotification(getFriendlyErrorMessage(error));
              });
          })
          .catch((error) => {
            handleNotification(getFriendlyErrorMessage(error));
          });
      })
      .catch(() => { });
  };

  function handleClick() {
    setHideshowEmail(!hideshowemail);
  }
  function handleOtherClick() {
    setHideshowPhone(!hideshowphone);
  }

  const onChange = (checked) => {
    form.resetFields();
    setEmail("");
    setPassword("");
    setPhoneNumber(null);
  };

  function handleSubmit(userApi, isGoogleSignIn = false) {
    fetch("https://console.collect2play.com/api/auth/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userApi),
    })
      .then((response) => {
        if (!response.ok) {
          handleNotification(response);
        }
        return response.json();
      })
      .then((data) => {
        if (data.type == "error") {
          handleNotification(
            data.message
          );
        }
        else {
          if (!isGoogleSignIn)
            handleNotification(
              "Successfully Signed Up, Please use credentials to login",
              "success"
            );
          else {
            localStorage.setItem("access_token", data.access_token);
            window.location.href = "/";
          }
          setIsSignup(true);

        }
      })
      .catch((error) => {
        handleNotification(error);
      });
  }
  useEffect(() => {
    form.resetFields();
    setEmail("");
    setPassword("");
    setPhoneNumber(null);
  }, [isSignup]);

  function handleNotification(message, type = "error") {
    setNotificationText(message);
    setNotificationType(type);
    setShowNotification(true);
    setIsLoading(false);
  }

  function onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          sendVerificationCode();
        },
        "expired-callback": () => { },
      },
      auth
    );
  }

  function sendVerificationCode() {
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneTemp = "+" + phoneNumber;
    signInWithPhoneNumber(auth, phoneTemp, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setVerificationId(confirmationResult);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function registerUserWithPhoneNumber(verificationCode, password) {
    try {
      await form.validateFields() // Validate form fields

      const credential = await verificationId.confirm(verificationCode);
      const userApi = {
        firebase_relay: `${credential._tokenResponse.localId}`,
        phone_no: credential.user.phoneNumber,
        c2p_user_role: 1,
        password: password,
      };
      handleNotification(
        "You have successfully registered, Please use your credentials for login",
        "success"
      );
      setIsSignup(true);

      handleSubmit(userApi);
    } catch (error) {
      if (!password || !phoneNumber || !verificationCode) {
        handleNotification("Please enter all the required values")
      }
      else {
        handleNotification(getFriendlyErrorMessage(error));

      }
    }
  }
  function setPhone(value, country) {
    setPhoneNumber(value);
    setCountryCode(`+${country.dialCode}`);

  }

  return (
    <>
      <div id="recaptcha-container"></div>
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
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    value={phoneNumber}
                    onChange={(e, v) => {
                      setPhone(e, v)
                    }}
                    countryCodeEditable={false}
                    inputStyle={{
                      paddingTop: 35,
                      paddingRight: 14,
                      paddingBottom: 35,
                      paddingLeft: 50,
                    }}
                    country={"us"}
                    className="w-100 phonenumber_field countries"
                    inputClass="contact_field"
                  />
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
                {OTP && !isSignup && (
                  <Form.Item name="otp">
                    <Input.Password
                      maxLength={8}
                      placeholder="OTP"
                      onChange={(e) => setVerificationCode(e.target.value)}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }

                    />
                  </Form.Item>
                )}
                {OTP && !isSignup &&
                  <Form.Item name="otp1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      className="getotp"
                      style={{ color: "#0d6efd !important", background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                      onClick={() => {
                        sendVerificationCode(verificationCode, email, password);
                      }}
                    >
                      GET OTP
                    </button>
                  </Form.Item >}
                <div className="mt-3">
                  <Switch
                    onChange={onChange}
                    // className="mt-4"
                    onClick={() => {
                      handleClick();
                      handleOtherClick();
                      otpfield();
                    }}
                  />

                  {
                    !OTP &&
                    <Link to="/forgot_password">
                      <span className="float-end">Forgot Password?</span>
                    </Link>
                  }
                </div>
                {/* <Link to="/home"> */}
                <button
                  onClick={() => {
                    OTP
                      ? !isSignup
                        ? registerUserWithPhoneNumber(
                          verificationCode,
                          password
                        )
                        : handlePhoneSignIn()
                      : !isSignup
                        ? handleSignUp()
                        : handleSignIn();
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

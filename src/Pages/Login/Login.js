import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import PhoneInput from 'react-phone-number-input'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Alert, Form } from "antd";
import { Switch } from "antd";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
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
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [form] = Form.useForm();

  function otpfield() {
    setOTP(!OTP);
  }

  function onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          sendVerificationCode();
        },
        "expired-callback": () => {},
      },
      auth
    );
  }

  function sendVerificationCode() {
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    setIsLoading(true);
    let phoneTemp = "+" + phoneNumber;

    signInWithPhoneNumber(auth, phoneTemp, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setVerificationId(confirmationResult);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSignUpVerificationCode = (
    verificationId,
    verificationCode,
    password
  ) => {
    const credential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );

    createUserWithEmailAndPassword(auth, `${phoneNumber}@example.com`, password) // Note the empty email
      .then((userCredential) => {
        // Link the phone credential with the email/password account
        const currentUser = userCredential.user;
        currentUser
          .linkWithCredential(credential)
          .then(() => {
            // User successfully linked
            console.log("User successfully linked");

            // Log the user in
            auth
              .signInWithCredential(credential)
              .then((user) => {
                // User successfully logged in
                console.log("User successfully logged in");
                localStorage.setItem("access_token", user.accessToken);

                window.location.href = "/";
              })
              .catch((error) => {
                // Handle errors
                console.log("Error logging in:", error);
                handleNotification(getFriendlyErrorMessage(error));
              });
          })
          .catch((error) => {
            // Handle errors
            console.log("Error linking account:", error);
            handleNotification(getFriendlyErrorMessage(error));
          });
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        handleNotification(getFriendlyErrorMessage(error));
      });
  };
  // Function to sign up user with phone number and password

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
    return () => {};
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
              localStorage.setItem("access_token", user.accessToken);
              console.log(user);
              window.location.href = "/";
            } else {
              // User's email has not been verified

              handleNotification("Please verify your email before signing in.");
            }
          })
          .catch((error) => {
            handleNotification(getFriendlyErrorMessage(error));
          });
      })
      .catch(() => {});
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
            sendEmailVerification(user)
              .then(() => {
                // Verification email sent successfully
                handleNotification(
                  "Please check your email to verify your account.",
                  "success"
                );
                setIsSignup(true);
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
      })
      .catch(() => {});
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

  const signInWithPhone = async (phoneNumber, password, verificationCode) => {
    debugger
    try {
      // Verify the code first
      const credential = await signInWithPhoneNumber(
        verificationId,
        verificationCode
      );
      const result = await signInWithEmailAndPassword(
        auth,
        `${phoneNumber}@example.com`,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  // const signInWithPhone = (verificationId, verificationCode) => {
  //   const credential = PhoneAuthProvider.credential(
  //     verificationId,
  //     verificationCode
  //   );

  //   signInWithCredential(auth, credential)
  //     .then((userCredential) => {
  //       User successfully logged in
  //       console.log("User successfully logged in");
  //     })
  //     .catch((error) => {
  //       Handle errors
  //       console.log("Error logging in:", error);
  //     });
  // };
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
  }, [isSignup]);

  function handleNotification(message, type = "error") {
    setNotificationText(message);
    setNotificationType(type);
    setShowNotification(true);
    setIsLoading(false);
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
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: "Please enter the phone number",
                    },
                  ]}
                >
                  {hideshowphone && (
                    <PhoneInput
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                      }}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e)}
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
                  )}
                </Form.Item>

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
                {OTP && (
                  <>
                    <Form.Item
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message: "Please enter the OTP",
                        },
                      ]}
                      name="otp"
                    >
                      <button
                        className="mt-4"
                        onClick={() => {
                          sendVerificationCode();
                        }}
                      >
                        GET OPT
                      </button>
                      <Input.Password
                        placeholder="OTP"
                        onChange={(e) => setVerificationCode(e.target.value)}
                        iconRender={(e) =>
                          (e = (
                            <span
                              href="#"
                              className="getotp"
                              style={{ color: "#0d6efd !important" }}
                              onClick={() => {
                                sendVerificationCode();
                              }}
                            >
                              GET OTP
                            </span>
                          ))
                        }
                      />
                    </Form.Item>
                  </>
                )}

                <div>
                  <Switch
                    onChange={onChange}
                    // className="mt-4"
                    onClick={() => {
                      handleClick();
                      handleOtherClick();
                      otpfield();
                    }}
                  />
                  /
                  <Link to="/forgot_password">
                    <span className="float-end">Forgot Password?</span>
                  </Link>
                </div>
                {/* <Link to="/home"> */}
                <button
                  onClick={() => {
                    // handleSignUpVerificationCode(
                    //   verificationId,
                    //   verificationCode,
                    //   password
                    // );
                    // !isSignup ? handleSignUp() : handleSignIn();

                    // !isSignup
                    //   ? OTP
                    //     ? handleSignUpVerificationCode(
                    //         verificationId,
                    //         verificationCode,
                    //         password
                    //       )
                    //     : handleSignUp()
                    //   : OTP
                    //   ? signInWithPhone()
                    //   : handleSignIn();
                    signInWithPhone(phoneNumber, password, verificationCode);
                  }}
                  // type="submit"
                  // disabled={isLoading}
                  className="signinbutton mt-4"
                >
                  {!isSignup ? "Register" : "Log in"}
                  {/* <span
                    className={
                      isLoading &&
                      `spinner-border spinner-border-sm mx-2 text-light`
                    }
                  ></span> */}
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

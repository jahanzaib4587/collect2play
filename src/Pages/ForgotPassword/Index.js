import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Alert, Form } from "antd";
import { auth } from "../../Firebase/Firebase";
import {
  getAuth,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";

import "./index.css";
import { motion } from "framer-motion";
import { getFriendlyErrorMessage } from "../../Components/Utilities/Utilities";

const Login = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("abc");
  const [isLoading, setIsLoading] = useState(false);
  const [notificationType, setNotificationType] = useState("error");
  const [email, setEmail] = useState("");

  const [form] = Form.useForm();

  const handleForgotPassword = () => {
    form
      .validateFields()
      .then(() => {
        setIsLoading(true);
        sendPasswordResetEmail(auth, email)
          .then(() => {
            setNotificationText("Password reset email sent successfully");
            setShowNotification(true);
            setNotificationType("success");
            console.log("Password reset email sent successfully");
            setIsLoading(false);
            form.resetFields();
            // show success message to user
          })
          .catch((error) => {
            const friendlyErrorMessage = getFriendlyErrorMessage(error);
            setNotificationText(friendlyErrorMessage);
            setShowNotification(true);
            setIsLoading(false);
          });
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => {
        setShowNotification(false);
        setNotificationText("");
      }, 3000);
    }
    return () => {};
  }, [showNotification]);

  return (
    <>
      <div className="login_Background1">
        <div className="container">
          <div className="row Wrapper1 align-items-center justify-content-center">
            <div className="col-md-6 px-3">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/Collect 2 Play Logo_mobile.png"
                }
                alt=""
                className="d-block m-auto"
              />
              <h1>Forgot Password</h1>
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
                <button
                  onClick={() => {
                    handleForgotPassword();
                  }}
                  // type="submit"

                  className="signinbutton mt-4"
                >
                  Send Verification Email
                  <span
                    className={
                      isLoading &&
                      `spinner-border spinner-border-sm mx-2 text-light`
                    }
                  ></span>
                </button>
                <Link to="/login">
                  <span className="float-end mt-2">
                    Remembered your password? Go back to login
                  </span>
                </Link>
              </Form>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

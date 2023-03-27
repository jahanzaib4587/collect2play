import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Alert, Form } from "antd";
import { Switch } from "antd";
import { apiCall } from "../../Api/ApiCall";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    sendPasswordResetEmail,
    GoogleAuthProvider,

} from "firebase/auth";
import firebaseConfig from "../../Firebase/Firebase";
import "../Login/Login.css";
import { motion } from "framer-motion";

const Login = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("abc");
    const [isLoading, setIsLoading] = useState(false);
    const [notificationType, setNotificationType] = useState("error");
    const [email, setEmail] = useState("");

    const [form] = Form.useForm();

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    const handleForgotPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setNotificationText("Password reset email sent successfully");
                setShowNotification(true);
                setNotificationType("success")
                console.log("Password reset email sent successfully");
                // show success message to user
            })
            .catch((error) => {
                const friendlyErrorMessage = getFriendlyErrorMessage(error);
                setNotificationText(friendlyErrorMessage);
                setShowNotification(true);

                console.log(error);
            });
    };

    useEffect(() => {
        if (showNotification) {
            setTimeout(() => {
                setShowNotification(false);
                setNotificationText("");
            }, 3000);
        }
        return () => { };
    }, [showNotification]);

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
            case "auth/user-not-found":
                return "User not found. Please check your email address and try again.";
            case "auth/invalid-email":
                return "Invalid email address. Please check your email address and try again.";
            case "auth/expired-action-code":
                return "The password reset link has expired. Please request a new link.";
            case "auth/invalid-action-code":
                return "The password reset link is invalid. Please request a new link.";
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
                                        handleForgotPassword()
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

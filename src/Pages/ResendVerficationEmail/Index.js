import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    sendEmailVerification
} from "firebase/auth";
import firebaseConfig from "../../Firebase/Firebase";
import "../ForgotPassword/index.css";

const Login = () => {
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    useEffect(() => {
        handleResendVerificationEmail()
    }, [])

    const handleResendVerificationEmail = () => {
        const user = auth.currentUser;

        sendEmailVerification(user)
            .then(() => {
                // Verification email sent successfully

            })
            .catch((error) => {

                // Handle email verification errors here
                console.log(error);
            });


    };


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
                            <h1>"Verification Email Sent Successfully!"</h1>
                            <div className="d-flex justify-content-center align-items-center flex-column">
                                <p className="text-white text-center">Please check your email and follow the instructions to verify your account. If you don't see the email in your inbox, please check your spam folder.</p>
                                <p className="text-white">Thank you for using our service!</p>
                            </div>
                            <Link to="/login">
                                <span className="float-end mt-2">
                                    Verified your email? Go back to login
                                </span>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

import {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import {AuthContext} from "../../context/AuthContext.jsx";
import {UserType} from "../../enums/userType.jsx";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
// import SecondFooter from "../SecondFooter";

const Login = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {loginAsync, authLoading, authenticated, authError, authMessage} = useContext(AuthContext);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  // const handleSubmit = async (values, { setSubmitting, setErrors }) => {
  const handleSubmit = async (values) => {

    await loginAsync(values.email, values.password);
  };

  useEffect(() => {
  console.log("Authenticated : ", authenticated);
  console.log("AuthMessage : ", authMessage);
  console.log("Error : ", authError);
  if (authenticated) {
    console.log("Authenticated User : ", user);
    // user?.role === UserType.PLAYER ? navigate("/home") : navigate("/home");
    navigate("/home");
  } else if (authMessage) {
    toast.error(authMessage);
  }
}, [authenticated, authError, authMessage]);
  return (
    <>
     <div>
      <div className="login">
        <div className="container-coach">
          <div className="bg"></div>
          <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
        {/*{({isSubmitting, errors }) => (*/}
        { () => (
        <Form>
          <div className="title">
            <h1>
              <span>Login</span>
            </h1>
            <p>Welcome back! Please log in to access your account.</p>
            {/*{errors.submit && <div className="error-text">{errors.submit}</div>}*/}
            {authMessage.submit && <div className="error-text">{authMessage.submit}</div>}
          </div>

          <div className="inputs username-email">
            <div className="rules">
              <ErrorMessage name="email" component="div" className="error" />
              <Field type="email" name="email" placeholder="Enter your Email" />
            </div>
              <div className="rules" style={{ position: "relative" }}>
              <ErrorMessage name="password" component="div" className="error" />
                <Field type={showPassword ? "text" : "password"}  name="password"  placeholder="Enter your Password"/>
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 10, top: 32, cursor: "pointer", userSelect: "none",  }}>
                  {showPassword ? <button className="show-hide"><FaEyeSlash /></button> : <button className="show-hide"><FaEye /></button>}
                </span>
            </div>
          </div>

          <div className="paths">
            <Link to="/resetpassword">Forgot Password?</Link>
          </div>

          <div className="btns">
          <button type="submit" disabled={authLoading}>{authLoading ? <FaSpinner className="loading-login" /> : "Login"}</button>
            <Link to="/register-player">Sign Up</Link>
          </div>       
        </Form>
      )}
    </Formik>
        </div>
      </div>
    </div>

    {/* <SecondFooter width={'90%'} backgroundColor={'#000000'}/> */}
    </>
  );
};

export default Login;

import React, {useContext, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {AuthContext} from "../../context/AuthContext.jsx";
import {UserType} from "../../enums/userType.jsx";
import {FaSpinner} from "react-icons/fa";

const RegisterCoach = () => {
    const {registerCoach, authLoading, authenticated, authError, authMessage} = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()
    const validationSchema = Yup.object({
    Username: Yup.string().required("Username is required"),
    Email: Yup.string().email("Invalid email address").required("Email is required"),
    Password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    PhoneNumber: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number").required("Phone number is required"),
    Specialization: Yup.string().required("Specialization is required"),
    Experience: Yup.string().required("Experience is required"),
    CurrentClubName: Yup.string().required("CurrentClubName is required"),
    CoachingSpecialty: Yup.string().required("Coaching specialty is required"),
    profilePhoto: Yup.mixed().required("Portfolio is required").test("fileSize", "File too large", (value) => !value || value.size <= 1024 * 1024), // Limit file size to 1MB
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== "profilePhoto") {
        formData.append(key, values[key]);
      }
    });
    console.log(formData);
    if (values.profilePhoto) {
      formData.append("profilePhoto", values.profilePhoto);
    }

    registerCoach(formData);
  }

    useEffect(() => {
        if (authenticated) {
            console.log("Authenticated")
            toast.success(`You have successfully registered, ${user?.username}!`);
            // user?.role == UserType.PLAYER ? navigate("/home/players") : navigate("/home/coaches")
            navigate("/home");
        }
        else if (authMessage)
        {
            toast.error(authMessage);

        }
    }, [authenticated,authMessage]);


 
  return (
    <>
     <div>
      <div className="register-coach">
        <div className="container-coach">
          <div className="bg"></div>
          <Formik
            initialValues={{
              Username: "",
              Email: "",
              Password: "",
              PhoneNumber: "",
              Specialization: "",
              Experience: "",
              CurrentClubName: "",
              CoachingSpecialty: "",
              profilePhoto: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true} // Enable validation on change
            validateOnBlur={true} // Enable validation on blur when leaving the input
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <div className="title">
                  <h1>
                    <span>Sign Up</span> As Coach
                  </h1>
                  <p>
                    Join our community today! Create an account to unlock exclusive features and personalized experiences.
                  </p>
                </div>
                <div className="inputs username-email">
                <div className="rules">
                <ErrorMessage name="Username" component="div" className="error" />
                <Field type="text" name="Username" placeholder="Enter Your Username" />
                </div>
                 <div className="rules">
                 <ErrorMessage name="Email" component="div" className="error" />
                 <Field type="email" name="Email" placeholder="Enter Your Email" />
                 </div>
                </div>
                <div className="inputs input-password">
                  <div className="rules">
                  <ErrorMessage name="Password" component="div" className="error" />
                  <Field type="password" name="Password" placeholder="Enter Your Password" />
                  </div>
                 <div className="rules">
                  <ErrorMessage name="PhoneNumber" component="div" className="error"/>
                  <Field type="text" name="PhoneNumber" placeholder="Enter Your Phone Number"/>
                </div>
                </div>
                <div className="inputs select-specialization-experience">
                  <div className="rules">
                  <ErrorMessage name="Specialization" component="div" className="error" />
                  <Field as="select" name="Specialization" className="select-specialization">
                    <option value="" disabled>Select your specialization</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    </Field>
                  </div>
                  <div className="rules">
                  <ErrorMessage name="Experience" component="div" className="error" />
                  <Field as="select" name="Experience" className="select-experience">
                    <option value="" disabled>Enter your experience</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3+ Years</option>
                    </Field>
                  </div>
                </div>
                <div className="inputs club-name-select-coaching-specialty">
                  <div className="rules">
                  <ErrorMessage name="CurrentClubName" component="div" className="error" />
                  <Field type="text" name="CurrentClubName" className="input-club-name" placeholder="Enter your current club Name" />
                  </div>
                  <div className="rules">
                  <ErrorMessage name="CoachingSpecialty" component="div" className="error" />
                  <Field as="select" name="CoachingSpecialty" className="select-coaching-specialty">
                    <option value="" disabled>Select your coaching specialty</option>
                    <option value="strength">Strength Training</option>
                    <option value="tactics">Tactical Coaching</option>
                    </Field>
                  </div>
                </div>
                <div className="inputs input-upload-image">
                  <input
                    type="file"
                    id="profilePhoto"
                    className="input-portfolio-file"
                    onChange={(e) => setFieldValue("profilePhoto", e.target.files[0])}
                  />
                  <label htmlFor="profilePhoto" className="label-portfolio-upload">
                    Upload your coaching portfolio
                  </label>
                  <ErrorMessage name="profilePhoto" component="div" className="error" />
                </div>
                <div className="btns">
                  <button type="submit" disabled={authLoading}>{authLoading ? <FaSpinner className="loading-login" /> : "Sign Up"}
                  </button>
                  <Link to="/login">Login</Link>
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

export default RegisterCoach;

import React, {useEffect, useContext} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {UserType} from "../../enums/userType.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {FaSpinner} from "react-icons/fa";

const RegisterPlayers = () => {

    const {registerPlayer, authLoading, authenticated, authError, authMessage} = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        Username: Yup.string().required("Username is required"),
        Email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        Password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .matches(
                /[^a-zA-Z0-9]/,
                "Password must have at least one special character (e.g. !@#$%)"
            )
            .required("Password is required"),
        // confirmPassword: Yup.string()
        //   .oneOf([Yup.ref("password"), null], "Passwords must match")
        //   .required("Confirm password is required"),
        PhoneNumber: Yup.string()
            .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
            .required("Phone number is required"),
        Age: Yup.number().required("Age is required"),
        Height: Yup.number().required("Height is required"),
        Weight: Yup.number().required("Weight is required"),
        Position: Yup.string().required("Position is required"),
        profilePhoto: Yup.mixed()
            .required("Skills video or photo is required")
            .test(
                "fileSize",
                "File too large",
                (value) => !value || value.size <= 20 * 1024 * 1024 // 20MB
            ),
    });

    const handleSubmit = async (values, {setSubmitting}) => {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            if (key !== "profilePhoto") {
                formData.append(key, values[key]);
            }
        });
        if (values.profilePhoto) {
            formData.append("profilePhoto", values.profilePhoto);
        }
        console.log(formData);



        registerPlayer(formData);
    }


    useEffect(() => {
        if (authenticated) {
            console.log("Authenticated")
            toast.success(`You have successfully registered, ${user?.username}!`);
            user?.role == UserType.PLAYER ? navigate("/home/players") : navigate("/home/coaches")
        }
        else if (authMessage)
        {
            toast.error(authMessage);

        }
    }, [authenticated, authMessage]);


    return (
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
                            Age: "",
                            Height: "",
                            Weight: "",
                            Position: "",
                            profilePhoto: null,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={true} // Enable validation on change
                        validateOnBlur={true} // Enable validation on blur when leaving the input
                    >
                        {({setFieldValue, isSubmitting}) => (
                            <Form>
                                <div className="title">
                                    <h1>
                                        <span>Sign Up</span> As Player
                                    </h1>
                                    <p>
                                        Join our community today! Create an account to unlock
                                        exclusive features and personalized experiences.
                                    </p>
                                </div>

                                <div className="inputs username-email">
                                    <div className="rules">
                                        <ErrorMessage
                                            name="Username"
                                            component="div"
                                            className="error"
                                        />
                                        <Field
                                            type="text"
                                            name="Username"
                                            placeholder="Enter Your Username"
                                        />
                                    </div>
                                    <div className="rules">
                                        <ErrorMessage
                                            name="Email"
                                            component="div"
                                            className="error"
                                        />
                                        <Field
                                            type="email"
                                            name="Email"
                                            placeholder="Enter Your Email"
                                        />
                                    </div>
                                </div>

                                <div className="inputs input-password">
                                    <div className="rules">
                                        <ErrorMessage
                                            name="Password"
                                            component="div"
                                            className="error"
                                        />
                                        <Field
                                            type="password"
                                            name="Password"
                                            placeholder="Enter Your Password"
                                        />
                                    </div>
                                    <div className="rules">
                                        <ErrorMessage
                                            name="PhoneNumber"
                                            component="div"
                                            className="error"
                                        />
                                        <Field
                                            type="text"
                                            name="PhoneNumber"
                                            placeholder="Enter Your Phone Number"
                                        />
                                    </div>
                                </div>

                                <div className="inputs select-specialization-experience">
                                    <div className="rules">
                                        <ErrorMessage
                                            name="Age"
                                            component="div"
                                            className="error"
                                        />
                                        <Field
                                            type="number"
                                            name="Age"
                                            placeholder="Enter Your Age"
                                        />
                                    </div>
                                    <div className="rules">
                                        <ErrorMessage
                                            name="Height"
                                            component="div"
                                            className="error"
                                        />
                                        <Field
                                            type="number"
                                            name="Height"
                                            placeholder="Enter Your Height (CM)"
                                        />
                                    </div>
                                </div>

                                <div className="inputs club-name-select-coaching-specialty">
                                    <div className="rules">
                                        <ErrorMessage
                                            name="Weight"
                                            component="div"
                                            className="error"
                                        />
                                        <Field
                                            type="number"
                                            name="Weight"
                                            placeholder="Enter Your Weight (KG)"
                                        />
                                    </div>
                                    <div className="rules">
                                        <ErrorMessage
                                            name="Position"
                                            component="div"
                                            className="error"
                                        />
                                        <Field as="select" name="Position">
                                            <option value="" disabled>
                                                Select your position
                                            </option>
                                            <option value="Goalkeeper">Goalkeeper</option>
                                            <option value="Defender">Defender</option>
                                            <option value="Midfielder">Midfielder</option>
                                            <option value="Forward">Forward</option>
                                        </Field>
                                    </div>
                                </div>

                                <div className="inputs input-upload-image">
                                    <input
                                        type="file"
                                        id="profilePhoto"
                                        className="input-portfolio-file"
                                        onChange={(e) =>
                                            setFieldValue("profilePhoto", e.target.files[0])
                                        }
                                    />
                                    <label
                                        htmlFor="profilePhoto"
                                        className="label-portfolio-upload"
                                    >
                                        Upload your skills video
                                    </label>
                                    <ErrorMessage
                                        name="profilePhoto"
                                        component="div"
                                        className="error"
                                    />
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
    );
};

export default RegisterPlayers;

//   try {
//     const response = await axios.post(
//       "http://glory-scout.tryasp.net/api/Auth/register-player",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     toast.success(`You have successfully registered, ${response.data.username}!`),
//     console.log("Response:", response.data);
//   } catch (error) {
//     console.error(
//       "Error:",
//       error.response ? error.response.data : error.message,
//       toast.error(error.response.data),
//     );
//   } finally {
//     setSubmitting(false);
//   }

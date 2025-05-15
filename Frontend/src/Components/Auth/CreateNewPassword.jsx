import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const CreateNewPassword = () => {
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[a-z]/, "Must contain a lowercase letter")
      .matches(/[0-9]/, "Must contain a number"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);

    try {
      const response = await axios.post(
        "Apis",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Password reset successfully!");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data || "Failed to reset password");
    } finally {
      setSubmitting(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  return (
    <div className="change-password">
      <div className="container-coach">
        <div className="bg"></div>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSubmit}
        >
          {({ isValid, setFieldTouched, isSubmitting }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setFieldTouched("password", true, true);
                setFieldTouched("confirmPassword", true, true);
                if (isValid) {
                  // هيسلم البيانات لو صالحة
                } else {
                  setFieldTouched("password", true, true);
                  setFieldTouched("confirmPassword", true, true);
                }
              }}
            >
              <div className="title">
                <h1>
                  <span>Create New</span> Password
                </h1>
                <p>
                  Join our community today! Create an account to unlock
                  exclusive features and personalized experiences.
                </p>
              </div>

              <div className="inputs input-password">
                <div className="rules">
                  <div className="rules" style={{ position: "relative" }}>
                  <ErrorMessage  name="password"  component="div"  className="error"/>
                    <Field  type={showPassword ? "text" : "password"}  name="password"  placeholder="Create New Password"/>
                    <span onClick={() => setShowPassword(!showPassword)} style={{    position: "absolute",    right: 10,    top: 43.5,    cursor: "pointer",    userSelect: "none",  }}>
                      {showPassword ? "Hide" : "Show"}
                    </span>
                  </div>
                </div>

                <div className="rules">
                  <div className="rules" style={{ position: "relative" }}>
                  <ErrorMessage  name="confirmPassword"  component="div"  className="error"/>
                    <Field  type={showConfirm ? "text" : "password"}  name="confirmPassword"  placeholder="Confirm New Password"/>
                    <span
                      onClick={() => setShowConfirm(!showConfirm)}
                      style={{  position: "absolute",  right: 10,  top: 43.5,  cursor: "pointer",  userSelect: "none",}}>
                      {showConfirm ? "Hide" : "Show"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="btns">
              <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Send Password Reset Link"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateNewPassword;

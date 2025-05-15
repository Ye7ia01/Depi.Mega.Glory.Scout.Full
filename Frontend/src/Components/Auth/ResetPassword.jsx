import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ResetPassword = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('APIS', {
        email: values.email,
      });
      console.log("Password reset link sent to " + values.email);
    } catch (error) {
      if (error.response) {
        setErrors({ submit: error.response.data.message || "An error occurred" });
        setErrors({ submit: "Network error" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="change-password">
        <div className="container-coach">
          <div className="bg"></div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true} // Enable validation on change
            validateOnBlur={true}   
          >
            {({ errors, isSubmitting, setFieldTouched }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFieldTouched("email", true, true);
                  if (!isSubmitting) {
                    handleSubmit();
                  }
                }}
              >
                <div className="title">
                  <h1>
                    <span>Reset My</span> Password
                  </h1>
                  <p>
                    Join our community today! Create an account to unlock exclusive features and personalized experiences.
                  </p>
                </div>

                <div className="inputs input-password">
                  <div className="rules">
                    <ErrorMessage name="email" component="div" className="error" />
                    <Field type="email" name="email" placeholder="Email Address" />
                  </div>

                  {/* <div className="rules">
                    <input type="radio" />
                    <p>Remember me</p>
                  </div> */}
                </div>

                {/* Show errors related to submit */}
                {errors.submit && <div className="error">{errors.submit}</div>}

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
    </div>
  );
};

export default ResetPassword;

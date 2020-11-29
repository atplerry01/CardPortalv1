import { useState } from "react";
import * as yup from "yup";

export const useAccountVerification = () => {
  const initialState = {
    accountNumber: "",
  };

  const [value, setValue] = useState(initialState);
  const [error, setError] = useState(initialState);

  const [
    isAccountNumberVerificationSuccessful,
    setIsAccountNumberVerificationSuccessful,
  ] = useState(false);

  const formSchema = yup.object().shape({
    accountNumber: yup
      .string()
      .required("Account Number is required")
      .test(
        "isAccountVerified",
        "Account Number must be 10 characters",
        (value) => value.length === 10
      ),
  });

  const handleChange = ({ target }) => {
    setValue((values) => ({
      ...values,
      [target.name]: target.value,
    }));
    setError((error) => ({
      ...error,
      [target.name]: "",
    }));
  };

  const handleBlur = (e) => {
    e.persist();
    formSchema.fields[e.target.name].validate(e.target.value).catch((error) => {
      setError((errors) => ({
        ...errors,
        [e.target.name]: error.message,
      }));
    });
  };

  const validateForm = async () => {
    return await formSchema
      .validate(value, { abortEarly: false })
      .catch((error) => {
        if (error.name === "ValidationError") {
          error.inner.forEach((fieldError) => {
            setError((error) => ({
              ...error,
              [fieldError.path]: fieldError.message,
            }));
          });
        }
      });
  };

  const handleSubmit = async () => {
    const isFormValid = await validateForm();

    if (isFormValid) {
      setIsAccountNumberVerificationSuccessful(true);
    }
  };

  const resetAccountVerificationForm = () => {
    setValue(initialState);
    setError(initialState);
  };

  return {
    value,
    error,
    isAccountNumberVerificationSuccessful,
    setIsAccountNumberVerificationSuccessful,
    handleChange,
    handleBlur,
    handleSubmit,
    resetAccountVerificationForm,
  };
};

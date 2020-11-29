import { useState } from "react";
import * as yup from "yup";

export const useWalletOpeningForm = () => {
  const initialState = {
    FirstName: "",
    LastName: "",
    MiddleName: "",
    MobileNumber: "",
    Email: "",
    Nationality: "",
    Country: "",
    State: "",
    City: "",
    StreetName: "",
    HouseNumber: "",
    Gender: "",
    DOB: "",
    Occupation: "",
    MaritalStatus: "",
    BVN: "",
  };

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const requiredField = (key) => yup.string().required(`${key} is required`);
  const formSchema = yup.object().shape({
    BVN: yup.string().notRequired(),
    City: requiredField("City"),
    Country: requiredField("Country"),
    DOB: requiredField("DOB"),
    Email: yup.string().email().notRequired(),
    FirstName: requiredField("First Name"),
    LastName: requiredField("Last Name"),
    HouseNumber: requiredField("House Number"),
    MaritalStatus: requiredField("Marital Status"),
    MiddleName: requiredField("Middle Name"),
    Nationality: requiredField("Nationality"),
    Occupation: requiredField("Occupation"),
    MobileNumber: requiredField("Mobile Number").test(
      "MobileNumber",
      "Mobile number must be 11 digits",
      (value) => value.length === 11
    ),
    State: requiredField("State"),
    StreetName: requiredField("StreetName"),
    gender: requiredField("gender"),
  });

  const handleAccountOpeningFormChange = ({ target }) => {
    setValues((values) => ({
      ...values,
      [target.name]: target.value,
    }));
    setErrors((errors) => ({
      ...errors,
      [target.name]: "",
    }));
  };

  const handleAccountOpeningFormBlur = (e) => {
    e.persist();
    formSchema.fields[e.target.name].validate(e.target.value).catch((error) => {
      setErrors((errors) => ({
        ...errors,
        [e.target.name]: error.message,
      }));
    });
  };

  const validateForm = async () => {
    return await formSchema
      .validate(values, { abortEarly: false })
      .catch((error) => {
        if (error.name === "ValidationError") {
          error.inner.forEach((fieldError) => {
            setErrors((error) => ({
              ...error,
              [fieldError.path]: fieldError.message,
            }));
          });
        }
      });
  };

  const resetAccountOpeningForm = () => {
    setValues(initialState);
    setErrors(initialState);
  };

  return {
    values,
    errors,
    handleAccountOpeningFormChange,
    validateForm,
    handleAccountOpeningFormBlur,
    resetAccountOpeningForm,
  };
};

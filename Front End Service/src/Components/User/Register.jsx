import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import "./UserService.jsx";
import UserService from "./UserService.jsx";
const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Scroll to the top of the component when it mounts
    window.scrollTo(0, 0);
  }, []);

  //For checking whether all the form values are valid
  const [isValid, setisValid] = useState(true);
  //User details
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    emailId: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  //User Model
  const {
    firstName,
    lastName,
    dateOfBirth,
    emailId,
    mobileNumber,
    password,
    confirmPassword,
    agreedToTerms,
  } = user;

  //for storing Form Errors 
  const [errors, setErrors] = useState({});

  //For Marking whether a input field is touched or not
  const [focused, setFocused] = useState({
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    emailId: false,
    mobileNumber: false,
    password: false,
    confirmPassword: false,
    agreedToTerms: false,
  });

  //Function to validate form values and set Error messages
  const validateForm = (name, value) => {

    //for checking if there is any error in form values
    let flag = true;
    //For storing new Errors
    const newErrors = { ...errors };

    switch (name) {
      case "firstName":
        newErrors.firstName =
          value.trim() === "" ? "First Name is required" : !/^[a-z ,.'-]+$/i.test(value)
            ? "Enter Valid First Name" : "";
        flag = flag && newErrors.firstName === "";
        break;
      case "lastName":
        newErrors.lastName = value.trim() === "" ? "Last Name is required" : !/^[a-z ,.'-]+$/i.test(value)
          ? "Enter Valid Last Name" : "";
        flag = flag && newErrors.lastName === "";
        break;
      case "dateOfBirth":
        newErrors.dateOfBirth =
          value === ""
            ? "Date of Birth is required"
            : validateDateOfBirth(value) < 18
              ? "You must be at least 18 years old"
              : "";
        flag = flag && newErrors.dateOfBirth === "";
        break;
      case "emailId":
        newErrors.emailId =
          value === ""
            ? "Email is required"
            : !/\S+@\S+\.\S+/.test(value)
              ? "Invalid email address"
              : "";
        flag = flag && newErrors.emailId === "";
        break;
      case "mobileNumber":
        newErrors.mobileNumber =
          value === ""
            ? "Mobile Number is required"
            : !/^([+]\d{2})?\d{10}$/.test(value)
              ? "Enter valid Mobile Number"
              : "";
        flag = flag && newErrors.mobileNumber === "";
        break;
      case "password":
        newErrors.password =
          value === ""
            ? "Password is required"
            : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              value
            )
              ? "Password should be minimum of 8 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
              : "";
        flag = flag && newErrors.password === "";
        break;
      case "confirmPassword":
        if (value === "") {
          newErrors.confirmPassword = "Enter Password again";
        } else if (value !== user.password) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        else {
          newErrors.confirmPassword = "";
        }
        flag = flag && newErrors.confirmPassword === "";
        break;
      case "agreedToTerms":
        newErrors.agreedToTerms = value === "" ? "Accept Terms and conditions to continue" : "";
        flag = flag && newErrors.agreedToTerms === "";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    setisValid(flag);
  };

  //Handling Input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validateForm(name, value);
  };

  const onCheckboxChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.checked });
    validateForm(e.target.name, e.target.checked);
  };
  const handleFocus = (e) => {
    setFocused({ ...focused, [e.target.name]: !e.target.checked });
    validateForm(e.target.name, e.target.value);
  };


  const validateDateOfBirth = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDiff = currentDate.getMonth() - selectedDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Check if the email already exists in the database
    /*const existingUser = await UserService.getUserByEmailId(user.emailId);
  
    if (existingUser) {
      alert("Email already exists. Please use a different email.");
    } 
    else{
  
      if(isValid)
      {
        try {
          UserService.registerUser(user);
          console.log("User registered successfully!");
          // Redirect to a success page or login page after successful registration
          navigate('/login'); 
        } catch (error) {
          console.error("Error registering user:", error);
          // Handle error, show a message to the user, or navigate to an error page
        }
      }
      else{
        console.log("Resolve errors");
      }
    }*/

    if (isValid) {
      try {
        UserService.registerUser(user);
        console.log("User registered successfully!");
        // Redirect to a success page or login page after successful registration
        navigate('/login');
      } catch (error) {
        console.error("Error registering user:", error);
        // Handle error, show a message to the user, or navigate to an error page
      }
    }
    else {
      console.log("Resolve errors");
    }
  };
  return (
    <div id="regContainer" data-testid="register-component" className="pt-3 pb-3">
      <div className="container mt-5 mb-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div id="reg" className="card">
              <div className="card-body p-5 shadow">
                <h2 className="text-uppercase text-center text-white mb-3">
                  Create an account
                </h2>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="row">
                    <div className="col-md-6 mb-3 pb-2">
                      <div className="form-outline ">
                        <label
                          className="form-label fs-5 text-white"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          placeholder="Enter First Name"
                          name="firstName"
                          className="form-control form-control-lg"
                          value={firstName}
                          onBlur={handleFocus}
                          onChange={(e) => onInputChange(e)}
                          data-testid="first-name-input"
                        />
                        <div data-testid="first-name-error">
                          {errors.firstName && focused.firstName && (
                            <div id="Error" >{errors.firstName}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3 pb-2">
                      <div className="form-outline ">
                        <label
                          className="form-label fs-5 text-white"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          placeholder="Enter Last Name"
                          name="lastName"
                          className="form-control form-control-lg"
                          value={lastName}
                          onBlur={handleFocus}
                          onChange={(e) => onInputChange(e)}
                          data-testid="last-name-input"
                        />
                        <div data-testid="last-name-error">
                          {errors.lastName && focused.lastName && (
                            <div id="Error">{errors.lastName}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-3">
                    <label
                      className="form-label fs-5 text-white"
                      htmlFor="dateOfBirth"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className="form-control form-control-lg"
                      value={dateOfBirth}
                      onBlur={handleFocus}
                      onChange={(e) => onInputChange(e)}
                      data-testid="date-of-birth-input"
                    />
                    {errors.dateOfBirth && focused.dateOfBirth && (
                      <div id="Error">{errors.dateOfBirth}</div>
                    )}
                  </div>
                  <div className="form-outline mb-3">
                    <label
                      className="form-label fs-5 text-white"
                      htmlFor="emailId"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="emailId"
                      name="emailId"
                      placeholder="Enter Email Id"
                      className="form-control form-control-lg"
                      value={emailId}
                      onBlur={handleFocus}
                      onChange={(e) => onInputChange(e)}
                      data-testid="email-input"
                    />
                    <div data-testid="email-error">
                      {errors.emailId && focused.emailId && (
                        <div data-testid="email-error" id="Error">{errors.emailId}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-outline mb-3">
                    <label
                      className="form-label fs-5 text-white"
                      htmlFor="mobileNumber"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="mobileNumber"
                      name="mobileNumber"
                      className="form-control form-control-lg"
                      placeholder="Enter Mobile Number"
                      value={mobileNumber}
                      onBlur={handleFocus}
                      onChange={(e) => onInputChange(e)}
                      data-testid="mobile-number-input"
                    />
                    <div data-testid="mobile-number-error">
                      {errors.mobileNumber && focused.mobileNumber && (
                        <div id="Error" data-testid="mobile-number-error">{errors.mobileNumber}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-outline mb-3">
                    <label
                      className="form-label fs-5 text-white"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      className="form-control form-control-lg"
                      value={password}
                      onBlur={handleFocus}
                      onChange={(e) => onInputChange(e)}
                      data-testid="password-input"
                    />
                    {errors.password && focused.password && (
                      <div id="Error">{errors.password}</div>
                    )}
                  </div>

                  <div className="form-outline mb-3">
                    <label
                      className="htmlForm-label fs-5 text-white"
                      htmlFor="confirmPassword"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control form-control-lg"
                      placeholder="Repeat Your Password"
                      value={confirmPassword}
                      onBlur={handleFocus}
                      onChange={(e) => onInputChange(e)}
                    />
                    {errors.confirmPassword && focused.confirmPassword && (
                      <div id="Error">{errors.confirmPassword}</div>
                    )}
                  </div>

                  <div className="form-check d-flex justify-content-center">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value={agreedToTerms}
                      id="terms"
                      onBlur={handleFocus}
                      checked={agreedToTerms}
                      onChange={(e) => onCheckboxChange(e)}
                      name="agreedToTerms"
                    />
                    <label
                      className="form-check-label text-white fs-5"
                      htmlFor="terms"
                    >
                      I agree all statements in{" "}
                      <Link to="#" id="terms" className="text-white">
                        <span>Terms of service</span>
                      </Link>
                    </label>
                  </div>
                  {errors.agreedToTerms && focused.agreedToTerms && (
                    <div id="Error" className="text-center">{errors.agreedToTerms}</div>
                  )}

                  <div className="d-flex justify-content-center mt-2">
                    <Button
                      id="regBtn"
                      className="btn btn-primary btn-lg"
                      onClick={(e) => onSubmit(e)}
                      disabled={!isValid}
                    >
                      Register
                    </Button>
                  </div>

                  <p id="Already" className="text-center text-white mt-2 mb-0">
                    already have an account?{" "}
                    <Link to="/login" className="text-white fs-5">
                      <u>Login here</u>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

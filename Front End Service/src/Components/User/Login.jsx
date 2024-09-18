import React, { useState, useEffect } from "react";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import "./UserService";
import UserService from "./UserService";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    emailId: "",
    password: "",
  });

  const { emailId, password } = user;
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({
    emailId: false,
    password: false,
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validate(name, value);
  };

  const handleFocus = (e) => {
    setFocused({ ...focused, [e.target.name]: !e.target.checked });
    validate(e.target.name, e.target.value);
  };

  const validate = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case "emailId":
        newErrors.emailId =
          value === ""
            ? "Email is required"
            : !/\S+@\S+\.\S+/.test(value)
              ? "Invalid email address"
              : "";
        break;

      case "password":
        newErrors.password = value === "" ? "Password is required" : "";
        break;

      default:
        break;
    }
    setErrors(newErrors);
  };
  // Validate email and password format
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.loginUser(user);
      console.log(response);
      const jwtToken = response.data.token;
      const userId = response.data.user;
      // Store the JWT token in localStorage or state for authentication
      sessionStorage.setItem("userId", userId);
      console.log(userId);
      console.log("Login successful. Token:", jwtToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div id="loginContainer" >
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={4} xs={12} style={{ paddingRight: "20px" }}>
            {/* <img src="https://learningzila.com/wp-content/uploads/2023/07/istockphoto-1281150061-612x612-1.jpg" alt="" style={{ height: "400px" }} /> */}
            <img src="Login-amico.png" alt="" style={{ height: "420px"  }}/>
          </Col>


          <Col md={8} lg={4} xs={12}>
            <Card id="log" className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-white">Login</h2>
                  <div className="mb-3">
                    <Form data-testid="login-form" onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="emailId">
                        <Form.Label className="text-white">
                          Email address
                        </Form.Label>
                        <Form.Control
                          onChange={(e) => onInputChange(e)}
                          type="email"
                          name="emailId"
                          value={emailId}
                          onBlur={handleFocus}
                          placeholder="Enter email"
                          data-testid="email-input"
                        />
                        {errors.emailId && focused.emailId && (
                          <div id="ErrorLog">{errors.emailId}</div>
                        )}
                      </Form.Group>
                      <Form.Group
                        className="mb-3 text-white"
                        controlId="password"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          onChange={(e) => onInputChange(e)}
                          type="password"
                          name="password"
                          value={password}
                          onBlur={handleFocus}
                          placeholder="Password"
                          data-testid="password-input"
                        />
                        {errors.password && focused.password && (
                          <div id="ErrorLog">{errors.password}</div>
                        )}
                      </Form.Group>

                      <div className="d-grid mx-auto col-lg-3 mt-4">
                        <Button id="logBtn" variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center text-white">
                        Don't have an account??{" "}
                        <Link to="/register" className="text-white fw-bold" >
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

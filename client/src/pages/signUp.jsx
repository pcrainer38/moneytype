import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../utils/mutations";
import { useUserContext } from "../components/UserContext.jsx";
import User from "../utils/user.js";
import { useThemeContext } from "../components/ThemeContext.jsx";

export default function SignUp(props) {
  const [addUser] = useMutation(ADD_USER);
  const [login] = useMutation(LOGIN_USER);

  const redirect = useNavigate();

  const { user, setUser } = useUserContext();
  const { queryTheme } = useThemeContext();

  useEffect(() => {
    if (user._id) redirect("/");
  }, [user]);

  let [auth, setAuth] = useState("signin");

  const changeAuth = () => {
    setAuth(auth === "signin" ? "signup" : "signin");
  };

  function blurHandler(event) {
    let target = event.target.id;

    let textValue = document.getElementById(target).value;

    // if (textValue === "") {
    //   document.getElementById(target + "-warning").style.display = "block";
    // } else {
    //   document.getElementById(target + "-warning").style.display = "none";
    // }

    document.getElementById(target + "-warning").style.display = `${
      textValue === "" ? "block" : "none"
    }`;

    if (target === "email") {
      let regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}/;
      let result = regex.test(textValue);
      document.getElementById(target + "-warning").style.display = `${
        result ? "none" : "block"
      }`;
    } else if (target === "password") {
      let pwregex = /^.{8,20}$/;
      let pwresult = pwregex.test(textValue);
      document.getElementById(target + "-warning").style.display = `${
        pwresult ? "none" : "block"
      }`;
    }
  }

  async function submitLogin(e) {
    e.preventDefault();
    let emailValue = document.getElementById("email").value;
    let passwordValue = document.getElementById("password").value;

    try {
      const response = await login({
        variables: {
          email: emailValue,
          password: passwordValue,
        },
      });

      User.setToken(response.data.login);
      setUser(User.getUser());
      queryTheme();

      console.log("Successful!");
      document.getElementById("authentication-warning").style.display = "none";
    } catch (err) {
      document.getElementById("authentication-warning").style.display = "block";
      console.log("Error! Check Network tab.");
      console.log(err);
    }
  }

  async function submitSignup(e) {
    e.preventDefault();
    let usernameValue = document.getElementById("username").value;
    let emailValue = document.getElementById("email").value;
    let passwordValue = document.getElementById("password").value;
    let response;
    let err;
    try {
      response = await addUser({
        variables: {
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
        },
      });
    } catch (e) {
      err = e;
    }
    if (!err && !response?.errors) {
      console.log("Successful!");
      User.setToken(response.data.addUser);
      setUser(User.getUser());
    } else {
      console.log("Error! Check Network tab.");
      console.log(err ?? response?.errors);
    }
  }

  if (auth === "signin") {
    return (
      <form
        className="signin col-4 mt-5 text-center mx-auto"
        onSubmit={submitLogin}
      >
        <div>
          <h3>Sign In</h3>
        </div>
        <div className="text-center">
          Not registered yet?{" "}
          <span className="link-primary" onClick={changeAuth}>
            Sign Up
          </span>
        </div>
        <div>
          <InputGroup className="mb-3 justify-content-center">
            <Form.Control
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              id="email"
              onBlur={blurHandler}
            />
          </InputGroup>
          <p id="email-warning">Email is required.</p>
        </div>

        <div className="password">
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon2"
              id="password"
              onBlur={blurHandler}
            />
          </InputGroup>
          <p id="authentication-warning">
            Email or password is incorrect. Please, try again.
          </p>
          <p id="password-warning">Password is required.</p>
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <form
        className="signin col-4 mt-5 text-center mx-auto"
        onSubmit={submitSignup}
      >
        <h3>Sign Up</h3>
        <div className="text-center">
          Already registered?{" "}
          <span className="link-primary" onClick={changeAuth}>
            Sign In
          </span>
        </div>
        <div>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon3"
              id="username"
              onBlur={blurHandler}
            />
          </InputGroup>
        </div>
        <p id="username-warning">Username is required.</p>
        <div>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon4"
              id="email"
              onBlur={blurHandler}
            />
          </InputGroup>
        </div>
        <p id="email-warning">Email is invalid.</p>
        <div>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon5"
              id="password"
              onBlur={blurHandler}
            />
          </InputGroup>
        </div>
        <p id="password-warning">
          Password must be between 8 and 20 characters.
        </p>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

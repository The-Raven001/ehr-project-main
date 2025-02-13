import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (inputValue.email == "" || inputValue.password == "") {
      alert("the inputs can not be empty");
      return;
    }

    const success = await actions.login({
      email: inputValue.email,
      password: inputValue.password,
    });
    if (success) {
      navigate("/protected/profile");
    } else {
      alert("Unable to log you in.");
    }
  }

  return (
    <div className="container w-25 border border-3 mt-5 maindiv bg-light">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">Login</h1>
        <div>
          <label
            htmlFor=""
            className="form-label text-secondary d-flex justify-content-start"
          >
            Email <span className="text text-danger">*</span>
          </label>
          <input
            name="email"
            value={inputValue.email}
            onChange={(event) => handleChange(event)}
            type="email"
            className="form-control input-back"
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="form-label text-secondary d-flex justify-content-start"
          >
            Password <span className="text text-danger">*</span>
          </label>
          <input
            name="password"
            value={inputValue.password}
            onChange={(event) => handleChange(event)}
            type="password"
            className="form-control input-back"
          />
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-dark w-50 mt-3 mb-1 saveButton"
          >
            Login
          </button>
        </div>
        <div className="d-flex justify-content-center mb-2">
          <Link to="/signup">
            <span>Don't have an account? Sign up!</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

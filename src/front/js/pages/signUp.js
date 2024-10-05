import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignUp = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [inputValue, setInputValue] = useState({
    name_office: "",
    address: "",
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      inputValue.name_office === "" ||
      inputValue.address === "" ||
      inputValue.name === "" ||
      inputValue.last_name === "" ||
      inputValue.email === "" ||
      inputValue.password === ""
    ) {
      alert("The inputs cannot be empty");
      return;
    }

    const success = await actions.signUp({
      name_office: inputValue.name_office,
      address: inputValue.address,
      name: inputValue.name,
      last_name: inputValue.last_name,
      email: inputValue.email,
      password: inputValue.password,
    });

    if (success) {
      navigate("/login");
    } else {
      alert("There was a problem creating your account.");
    }
  }

  return (
    <div className="container w-25 border border-3 mt-5 maindiv bg bg-light">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">Signup</h1>
        <div>
          <label className="form-label text-secondary d-flex justify-content-start">
            Name Of Facility <span className="text text-danger">*</span>
          </label>
          <input
            name="name_office"
            value={inputValue.name_office}
            onChange={handleChange}
            type="text"
            className="form-control input-back"
          />
        </div>
        <div>
          <label className="form-label text-secondary d-flex justify-content-start">
            Address <span className="text text-danger">*</span>
          </label>
          <input
            name="address"
            value={inputValue.address}
            onChange={handleChange}
            type="text"
            className="form-control input-back"
          />
        </div>
        <h3 className="text-secondary mt-3">Admin user</h3>
        <div>
          <label className="form-label text-secondary d-flex justify-content-start">
            Name <span className="text text-danger">*</span>
          </label>
          <input
            name="name"
            value={inputValue.name}
            onChange={handleChange}
            type="text"
            className="form-control input-back"
          />
        </div>
        <div>
          <label className="form-label text-secondary d-flex justify-content-start">
            Last Name <span className="text text-danger">*</span>
          </label>
          <input
            name="last_name"
            value={inputValue.last_name}
            onChange={handleChange}
            type="text"
            className="form-control input-back"
          />
        </div>
        <div>
          <label className="form-label text-secondary d-flex justify-content-start">
            Email <span className="text text-danger">*</span>
          </label>
          <input
            name="email"
            value={inputValue.email}
            onChange={handleChange}
            type="email"
            className="form-control input-back"
          />
        </div>
        <div>
          <label className="form-label text-secondary d-flex justify-content-start">
            Password <span className="text text-danger">*</span>
          </label>
          <input
            name="password"
            value={inputValue.password}
            onChange={handleChange}
            type="password"
            className="form-control input-back"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-dark w-50 mt-3 mb-1 saveButton"
          >
            Create account
          </button>
        </div>
        <div className="d-flex justify-content-center mb-2">
          <Link to="/login">
            <span>Already have an account?</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

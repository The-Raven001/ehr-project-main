import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditProfile = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    actions.getUserProfile().then((user) => {
      if (user) {
        setInputValue({
          name: user.name,
          lastName: user.last_name,
          email: user.email,
          password: "",
        });
      } else {
        alert("User not found");
        navigate("/");
      }
    });
  }, []);

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      inputValue.name === "" ||
      inputValue.lastName === "" ||
      inputValue.email === "" ||
      inputValue.password === ""
    ) {
      alert("The inputs cannot be empty");
      return;
    }

    const success = await actions.updateUserProfile({
      name: inputValue.name,
      last_name: inputValue.lastName,
      email: inputValue.email,
      password: inputValue.password,
      user_type: inputValue.userType,
    });

    if (success) {
      alert("User updated successfully!");
      navigate("/");
    } else {
      alert("Failed to update user.");
    }
  }

  return (
    <div className="container w-25 border border-3 maindiv mt-5 bg-light">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">Edit Profile</h1>
        <div>
          <label className="form-label text-secondary d-flex justify-content-start">
            Name:
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
            Lastname:
          </label>
          <input
            name="lastName"
            value={inputValue.lastName}
            onChange={handleChange}
            type="text"
            className="form-control input-back"
          />
        </div>
        <div>
          <label className="form-label text-secondary d-flex justify-content-start">
            Email:
          </label>
          <input
            name="email"
            value={inputValue.email}
            onChange={handleChange}
            type="text"
            className="form-control input-back"
          />
        </div>
        <div>
          <label className="form-label text-secondary d-flex justify-content-start">
            Password:
          </label>
          <input
            name="password"
            value={inputValue.password}
            onChange={handleChange}
            type="password"
            className="form-control input-back"
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark w-50 mt-3 mb-3 saveButton w-100"
        >
          Update
        </button>
        <div className="d-flex justify-content-center">
          <Link to="/protected/profile">Go back</Link>
        </div>
      </form>
    </div>
  );
};

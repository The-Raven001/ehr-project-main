import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CreateProfile = () => {
  const params = useParams();
  const { store, actions } = useContext(Context);
  const { userType, setUserType } = useState("Select user");
  const [inputValue, setInputValue] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

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

    const success = await actions.createProfile({
      name: inputValue.name,
      last_name: inputValue.lastName,
      email: inputValue.email,
      password: inputValue.password,
      role: inputValue.role,
    });

    if (success) {
      alert("User created successfully!");
      setInputValue({
        name: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
      });
    } else {
      alert("Failed to create user.");
    }
  }

  return (
    <div className="container w-25 border border-3 maindiv bg-light mt-5">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">
          {params.id ? "Edit contact" : "Create new user"}
        </h1>
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
        <div>
          <label className="form-label text-secondary d-flex justify-content-start">
            Select role:
          </label>
          <select
            name="userType"
            className="form-select"
            value={inputValue.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-50 mt-3 mb-3 saveButton w-100"
        >
          Create
        </button>
      </form>
    </div>
  );
};

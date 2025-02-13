import React from "react";

import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const FoundResults = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState({
    inputFromUser: "",
  });

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.inputFromUser === "") {
      alert("Please enter a chart number");
      return;
    }
    const success = await actions.improvedSearch(inputValue.inputFromUser);

    if (success) {
      alert("it worked");
    } else {
      alert("No results were found");
    }
  }

  return (
    <div className="container w-50 border border-3 mt-5 maindiv bg-light">
      <form action="" onSubmit={handleSubmit}>
        <h2 className="text-center">Search patient by chart</h2>
        <div>
          <label
            htmlFor="chart"
            className="form-label text-secondary d-flex justify-content-start text-center"
          ></label>
          <input
            name="inputFromUser"
            type="text"
            value={inputValue.inputFromUser}
            onChange={handleChange}
            className="form-control input-back text-center"
            placeholder="Enter any data related to the patient you are looking for"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-dark w-25 mt-3 mb-3 saveButton"
          >
            Search
          </button>
        </div>
        <Link to="/protected/profile" className="d-flex justify-content-center">
          Go back
        </Link>
      </form>
      <div>This is your confirmation</div>
    </div>
  );
};

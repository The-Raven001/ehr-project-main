import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Search = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [inputValue, setInputValue] = useState({
    chart: "",
  });

  function handleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.chart === "") {
      alert("Please enter a chart number");
      return;
    }

    const success = await actions.search(inputValue.chart);

    if (success) {
      alert("Patient found");
      navigate("/protected/chart");
    } else {
      alert("Patient not found");
    }
  }
  return (
    <div className="container w-25 border border-3 mt-5 maindiv bg-light">
      <form action="" onSubmit={handleSubmit}>
        <h2 className="text-center text-secondary">Search patient by chart</h2>
        <div>
          <label
            htmlFor="chart"
            className="form-label text-secondary d-flex justify-content-start text-center"
          ></label>
          <input
            name="chart"
            value={inputValue.chart}
            onChange={handleChange}
            type="number"
            className="form-control input-back"
            placeholder="Enter the chart of the patient you would like to find."
          />
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-dark w-50 mt-3 mb-3 saveButton"
          >
            Search
          </button>
        </div>
        <Link to="/protected/profile" className="d-flex justify-content-center">
          Go back
        </Link>
      </form>
    </div>
  );
};

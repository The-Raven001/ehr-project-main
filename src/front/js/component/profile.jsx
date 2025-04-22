import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    inputFromUser: "",
  });

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/protected/edit-profile");
  };

  const handleSearchImproved = () => {
    navigate("/protected/search-improved");
  };

  const handleCreateChart = () => {
    navigate("/protected/create-chart");
  };

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
      navigate("/protected/found-results");
    } else {
      alert("No results were found");
    }
  }

  return (
    <div className="d-flex justify-content-center ">
      <div className="bg-light d-flex justify-content-center align-items-center flex-column mt-5 maindiv">
        <div className="d-flex mb-3">
          <button
            className="btn btn-dark profileButton me-2"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button
            className="btn btn-dark profileButton me-2"
            onClick={handleCreateChart}
          >
            Create Chart
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-dark me-2 mb-3 profileButton"
        >
          Logout
        </button>
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
          <p className="text-secondary p-0 m-0">
            <em>
              -Search by chart by entering the corresponding chart number.
            </em>
          </p>
          <p className="text-secondary p-0 m-0">
            <em>
              -Search by name using the following format 'Last name, name'.
            </em>
          </p>
          <p className="text-secondary p-0 m-0">
            <em>-Search by date of birth using dd-mm-yyyy.</em>
          </p>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-dark w-25 mt-3 mb-3 saveButton"
            >
              Search
            </button>
          </div>
          <Link
            to="/protected/profile"
            className="d-flex justify-content-center"
          >
            Go back
          </Link>
        </form>
      </div>
    </div>
  );
};

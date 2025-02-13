import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const AddNote = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [patientId, setPatientId] = useState(null);
  const [noteData, setNoteData] = useState({
    patient_id: null,
    title: "",
    content: "",
  });

  useEffect(() => {
    const patient = store.patient;

    if (patient) {
      setPatientId(patient.id);
      setNoteData((prevData) => ({
        ...prevData,
        patient_id: patient.id,
      }));
    }

    if (!patient) {
      alert("There is no patient to add prescriptions to");
      navigate("/search");
    }
  }, [store.patient]);

  const handleChange = (event) => {
    setNoteData({
      ...noteData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (noteData.title === "" || noteData.content === "") {
      alert("All fields are required");
      return;
    }

    const success = await actions.addNote(noteData);
    if (success) {
      alert("Note created successfully");
      setNoteData({
        patient_id: patientId,
        title: "",
        content: "",
      });
    } else {
      alert("Failed to create note");
    }
  };

  return (
    <div className="container w-25 border border-3 mt-5 maindiv bg-light">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">Add Note</h1>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={noteData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            type="text"
            name="content"
            value={noteData.content}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-50 mt-3 mb-3 saveButton w-100"
        >
          Save note
        </button>
        <Link to="/protected/chart" className="d-flex justify-content-center">
          Go Back
        </Link>
      </form>
    </div>
  );
};

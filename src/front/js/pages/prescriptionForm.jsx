import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const PrescriptionForm = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [patientId, setPatientId] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    patient_id: null,
    name_of_medication: "",
    quantity: "",
    quantity_of_refills: "",
  });

  useEffect(() => {
    const patient = store.patient;

    if (patient) {
      setPatientId(patient.id);
      setPrescriptionData((prevData) => ({
        ...prevData,
        patient_id: patient.id,
      }));
    }

    if (!patient) {
      alert("There is no patient to add prescriptions to");
      navigate("/protected/search");
    }
  }, [store.patient]);

  const handleChange = (event) => {
    setPrescriptionData({
      ...prescriptionData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      prescriptionData.name_of_medication === "" ||
      prescriptionData.quantity === "" ||
      prescriptionData.quantity_of_refills === ""
    ) {
      alert("All fields are required");
      return;
    }

    const success = await actions.createPrescription(prescriptionData);
    if (success) {
      alert("Prescription created successfully");
      setPrescriptionData({
        patient_id: patientId,
        name_of_medication: "",
        quantity: "",
        quantity_of_refills: "",
      });

      navigate("/protected/chart");
    } else {
      alert("Failed to create prescription");
    }
  };

  return (
    <div className="container w-25 border border-3 mt-5 maindiv bg-light">
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-secondary">Create Prescription</h1>
        <div className="mb-3">
          <label className="form-label">Medication Name</label>
          <input
            type="text"
            name="name_of_medication"
            value={prescriptionData.name_of_medication}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={prescriptionData.quantity}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity of Refills</label>
          <input
            type="number"
            name="quantity_of_refills"
            value={prescriptionData.quantity_of_refills}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark w-50 mt-3 mb-3 saveButton w-100"
        >
          Submit prescription
        </button>
        <Link to="/protected/chart" className="d-flex justify-content-center">
          Go Back
        </Link>
      </form>
    </div>
  );
};

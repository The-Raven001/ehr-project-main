import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditPrescription = () => {
  const { store, actions } = useContext(Context);
  const { prescriptionId } = useParams();
  const navigate = useNavigate();

  const [nameOfMedication, setNameOfMedication] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityOfRefills, setQuantityOfRefills] = useState("");

  useEffect(() => {
    const prescription = store.prescriptions.find(
      (p) => p.id === parseInt(prescriptionId)
    );

    if (prescription) {
      setNameOfMedication(prescription.name_of_medication);
      setQuantity(prescription.quantity);
      setQuantityOfRefills(prescription.quantity_of_refills);
    } else {
      alert("Prescription not found");
      navigate(-1);
    }
  }, [prescriptionId, store.prescriptions, navigate]);

  const handleSave = async () => {
    const updatedPrescription = {
      name_of_medication: nameOfMedication,
      quantity: quantity,
      quantity_of_refills: quantityOfRefills,
    };

    await actions.editPrescription(prescriptionId, updatedPrescription);
    navigate(-1);
  };

  return (
    <div className="container w-25 border border-3 mt-5 maindiv bg-light">
      <h2>Edit Prescription</h2>
      <form>
        <div className="form-group">
          <label htmlFor="nameOfMedication">Name of Medication</label>
          <input
            type="text"
            className="form-control"
            id="nameOfMedication"
            value={nameOfMedication}
            onChange={(e) => setNameOfMedication(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity (mg)</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantityOfRefills">Quantity of Refills</label>
          <input
            type="number"
            className="form-control"
            id="quantityOfRefills"
            value={quantityOfRefills}
            onChange={(e) => setQuantityOfRefills(e.target.value)}
          />
        </div>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-dark mt-3 mb-3 saveButton w-50 me-3"
            onClick={handleSave}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-dark mt-3 mb-3 saveButton w-50"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

import React, { useState, useContext, useEffect } from "react";
import "../../styles/chart.css";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import UploadDocsForm from "../component/uploadDocsForm";

export const Chart = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [chart, setChart] = useState("");
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [insurance, setInsurance] = useState("");
  const [pharmacy, setPharmacy] = useState("");
  const [documents, setDocuments] = useState([]);
  const fetchDocuments = async () => {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/medias/${store.patient.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (!data) {
        return;
      }
      setDocuments(data);
    }
  };
  console.log(documents);
  useEffect(() => {
    fetchDocuments();
  }, [store.patient]);

  const handleUploadComplete = (message) => {
    fetchDocuments();
    alert(message);
  };

  useEffect(() => {
    const patient = store.patient;

    if (patient) {
      setChart(patient.chart);
      setName(patient.name);
      setMiddleName(patient.middle_name);
      setLastName(patient.last_name);
      setEmail(patient.email);
      setPhone(patient.phone_number);
      setDob(patient.dob);
      setInsurance(patient.name_of_insurance);
      setPharmacy(patient.name_of_pharmacy);

      actions.getPrescriptions(patient.id);
      actions.getNotes(patient.id);
    }

    if (!patient) {
      alert("There is no patient to show");
      navigate("/search");
    }
  }, [store.patient, navigate]);

  const handleEditClick = () => {
    navigate("/protected/edit-chart");
  };

  const navigateToAddDocument = () => {
    navigate("/protected/add-document");
  };

  const navigateToAddPrescription = () => {
    navigate("/protected/prescription-form");
  };

  const navigateToAddNote = () => {
    navigate("/protected/add-note");
  };

  const handleEditPrescription = (prescriptionId) => {
    navigate(`/prescription-form/${prescriptionId}`);
  };

  const handleDeletePrescription = async (prescriptionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prescription?"
    );
    if (confirmed) {
      await actions.deletePrescription(prescriptionId);
      actions.getPrescriptions(store.patient.id);
    }
  };

  return (
    <div className="patient-info">
      <Link to="/protected/search">Back to search</Link>
      <div className="patient-header">
        <div className="patient-profile">
          <div className="patient-avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="Avatar"
            />
          </div>
          <div className="patient-details">
            <h3>{`${name} ${middleName} ${lastName}`}</h3>
            <p>Chart #: {chart}</p>
          </div>
        </div>
        <div className="patient-summary">
          <p>
            <strong>Date of Birth:</strong> {dob}
          </p>
          <p>
            <strong>Insurance:</strong> {insurance}
          </p>
          <p>
            <strong>Primary Pharmacy:</strong> {pharmacy}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
        <div className="edit-button-container">
          <button
            className="edit-chart-button rounded bg-dark text-light"
            onClick={handleEditClick}
          >
            Edit Chart
          </button>
        </div>
      </div>
      <div className="patient-records row">
        <div className="section col-6">
          <div>
            <h4 className="d-flex justify-content-between">
              <strong>Documents</strong>
              <button
                type="button"
                className="add-item-button rounded d-flex justify-content-center"
                data-bs-toggle="modal"
                data-bs-target="#uploadDocsModal"
              >
                <i
                  className="fa-solid fa-circle-plus me-3"
                  style={{ color: "#01060e" }}
                ></i>
              </button>

              <div
                className="modal fade"
                id="uploadDocsModal"
                tabindex="-1"
                aria-labelledby="uploadDocsModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Upload File
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <UploadDocsForm onUploadComplete={handleUploadComplete} />
                    </div>
                  </div>
                </div>
              </div>
            </h4>
          </div>
          <ul>
            {documents && documents.length > 0 ? (
              documents.map((document) => (
                <li key={document.id}>
                  <span>{document.document_name}</span>
                  <a
                    className="btn btn-dark"
                    href={document.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </li>
              ))
            ) : (
              <li>No documents available</li>
            )}
          </ul>
          {/* <ul>
            <li>
              <span>Medical History</span>

              <a className="btn btn-dark" href={documents.medical}>
                View
              </a>
            </li>
            <li>
              <span>Lab Results</span>

              <a className="btn btn-dark" href={documents.lab}>
                View
              </a>
            </li>
            <li>
              <span>Imaging Reports</span>

              <a className="btn btn-dark" href={documents.imaging}>
                View
              </a>
            </li>
          </ul> */}
        </div>
        <div className="section col-6">
          <h4 className="d-flex justify-content-between">
            <strong>Current Prescriptions</strong>
            <button
              onClick={navigateToAddPrescription}
              className="add-item-button rounded d-flex justify-content-center"
            >
              <i
                className="fa-solid fa-circle-plus me-3"
                style={{ color: "#01060e" }}
              ></i>
            </button>
          </h4>
          <ul>
            {store.prescriptions.map((prescription) => (
              <li key={prescription.id}>
                <div className="prescription-details">
                  <span>{prescription.name_of_medication}</span>
                  <span className="prescription-info">{`${prescription.quantity}mg, ${prescription.quantity_of_refills}x refills left`}</span>
                </div>
                <button
                  className="edit-button mx-2 chartEditButton d-flex align-items-center"
                  onClick={() =>
                    navigate(`/protected/edit-prescription/${prescription.id}`)
                  }
                >
                  <i
                    className="fa-solid fa-pencil me-2"
                    styleName="color: #000000;"
                  ></i>
                  Edit
                </button>
                <button
                  className="delete-button chartButtonDelete d-flex align-items-center"
                  onClick={() => handleDeletePrescription(prescription.id)}
                >
                  <i
                    className="fa-solid fa-trash-can me-2"
                    styleName="color: #000000;"
                  ></i>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="notes row">
        <div className="col-12">
          <h4 className="d-flex justify-content-between">
            <strong>Notes of interaction</strong>
            <button
              onClick={navigateToAddNote}
              className="add-item-button rounded d-flex justify-content-center"
            >
              <i
                className="fa-solid fa-circle-plus me-3"
                style={{ color: "#01060e" }}
              ></i>
            </button>
          </h4>
          <ul>
            {store.notes && store.notes.length > 0 ? (
              store.notes.map((note) => (
                <div key={note.id}>
                  <h5>{note.title}</h5>
                  <div className="border rounded mb-3">
                    <li>
                      <p className="m-2">{note.content}</p>
                    </li>
                  </div>
                </div>
              ))
            ) : (
              <li>No notes available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const UploadDocsForm = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const { store } = useContext(Context);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/upload/${store.patient.id}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const successMessage = `File uploaded successfully on: ${data.url}`;
        onUploadComplete(successMessage);
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData || "There was an error uploading the file 1";
        onUploadComplete(errorMessage);
      }
    } catch (error) {
      const errorMessage = "There was an error uploading the file 2";
      onUploadComplete(errorMessage);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center bg-light">
      <form onSubmit={onSubmit} className="p-3 border rounded">
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Choose file
          </label>
          <input
            type="file"
            className="form-control"
            id="fileInput"
            onChange={onFileChange}
          />
        </div>
        <div>
          <input
            type="submit"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            value="Upload"
          />
        </div>
      </form>
    </div>
  );
};

export default UploadDocsForm;

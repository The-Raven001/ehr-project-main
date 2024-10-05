const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      patient: null,
      user: null,
      notes: [],
      prescriptions: [],
    },
    actions: {
      // Use getActions to call a function within a fuction

      //Users and office
      signUp: async ({
        name_office,
        address,
        name,
        last_name,
        email,
        password,
      }) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                name_office: name_office,
                address: address,
                name: name,
                last_name: last_name,
                email: email,
                password: password,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Unable to create office");
          }

          console.log("Office created successfully");
          return true;
        } catch (error) {
          console.log("Error in signUp:", error);
          return false;
        }
      },

      login: async ({ email, password }) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + "api/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          if (!response.ok) {
            throw new Error("There was an error while trying to log you in.");
          }
          const data = await response.json();
          console.log("Logged in!");

          setStore({ token: data.access_token, user: data.user });
          console.log(data);
          localStorage.setItem("token", data.access_token);
          return true;
        } catch (error) {
          console.log("Error in login", error);
          return false;
        }
      },

      createProfile: async (userData) => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            process.env.BACKEND_URL + "api/create-profile",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(userData),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Signup Error:", errorData);
            return false;
          }

          const result = await response.json();
          console.log("User created successfully:", result);
          return true;
        } catch (error) {
          console.error("Error creating user:", error);
          return false;
        }
      },

      getUserProfile: async () => {
        const token = localStorage.getItem("token");

        try {
          const response = await fetch(
            process.env.BACKEND_URL + "api/user/profile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const user = await response.json();
            setStore({ user });
            return user;
          } else {
            console.error("Error fetching user profile");
            return null;
          }
        } catch (error) {
          console.error("Error fetching user profile", error);
          return null;
        }
      },

      updateUserProfile: async (userData) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "api/user/profile",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(userData),
            }
          );
          if (response.ok) {
            const data = await response.json();
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error updating user profile", error);
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        setStore({ token: null, user: null });
      },
      getUser: async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(process.env.BACKEND_URL + "api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log(data);
          setStore({ user: data });
        } catch (error) {
          console.log("Error getting user", error);
        }
      },

      //Patients
      search: async (chart) => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${process.env.BACKEND_URL}api/search/${chart}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              "There was an error while trying to search for the chart"
            );
          }

          const data = await response.json();
          console.log("Patient data:", data);

          setStore({ patient: data });
          return data;
        } catch (error) {
          console.log("Error while trying to search chart", error);
          return false;
        }
      },

      createChart: async ({
        chart,
        name,
        middle_name,
        last_name,
        address,
        phone_number,
        email,
        gender,
        dob,
        provider,
        office_id,

        name_of_insurance,
        subscriber_id,
        subscription_start_date,
        subscription_end_date,
        financial_class_of_insurance,

        name_of_pharmacy,
        address_of_pharmacy,
      }) => {
        try {
          const token = localStorage.getItem("token");

          const response = await fetch(
            process.env.BACKEND_URL + "api/patients",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                chart: chart,
                name: name,
                middle_name: middle_name,
                last_name: last_name,
                address: address,
                phone_number: phone_number,
                email: email,
                gender: gender,
                dob: dob,
                provider: provider,
                office_id: office_id,
                name_of_insurance: name_of_insurance,
                subscriber_id: subscriber_id,
                subscription_start_date: subscription_start_date,
                subscription_end_date: subscription_end_date,
                financial_class_of_insurance: financial_class_of_insurance,
                name_of_pharmacy: name_of_pharmacy,
                address_of_pharmacy: address_of_pharmacy,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Unable to create chart");
          }

          console.log("Chart created succesfully!");
          return true;
        } catch (error) {
          console.log("Error creating chart:", error);
          return false;
        }
      },

      updateChart: async (patient) => {
        try {
          const token = localStorage.getItem("token");

          const response = await fetch(
            `${process.env.BACKEND_URL}api/patients`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(patient),
            }
          );

          if (!response.ok) {
            throw new Error("There was an error updating the patient chart.");
          }

          const updatedPatient = await response.json();
          console.log("Patient chart updated successfully:", updatedPatient);

          setStore({ patient: updatedPatient });

          return true;
        } catch (error) {
          console.error("Error in updateChart:", error);
          return false;
        }
      },

      //Prescriptions

      getPrescriptionById: async (id) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/prescriptions/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            console.error("Error fetching prescription:", response.status);
            return null;
          }
        } catch (error) {
          console.error("Error in getPrescriptionById function:", error);
          return null;
        }
      },

      updatePrescription: async (id, prescriptionData) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/prescriptions/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(prescriptionData),
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Prescription updated successfully", data);
            return true;
          } else {
            const errorData = await response.json();
            console.error("Error updating prescription:", errorData);
            return false;
          }
        } catch (error) {
          console.error("Error in updatePrescription function:", error);
          return false;
        }
      },

      createPrescription: async (prescriptionData) => {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "api/prescriptions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(prescriptionData),
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Prescription created successfully", data);
            return true;
          } else {
            const errorData = await response.json();
            console.log("Error creating prescription:", errorData);
            return false;
          }
        } catch (error) {
          console.log("Error in createPrescription function:", error);
          return false;
        }
      },

      getPrescriptions: async (patientId) => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}api/prescriptions?patient_id=${patientId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.ok) {
            const prescriptions = await response.json();
            setStore({ prescriptions: prescriptions });
          } else {
            console.log("Failed to fetch prescriptions.");
          }
        } catch (error) {
          console.log("Error fetching prescriptions:", error);
        }
      },
      addNote: async (noteDta) => {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(process.env.BACKEND_URL + "api/notes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(noteDta),
          });
          return true;
        } catch (error) {
          console.log("Error while creating note:", error);
          return false;
        }
      },

      getNotes: async (patient_id) => {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `api/notes?patient_id=${patient_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setStore({ notes: data });
          } else {
            console.error("Failed to fetch notes:", response.statusText);
          }
        } catch (error) {
          console.error("Failed to fetch notes:", error);
        }
      },
      editPrescription: async (prescriptionId, updatedPrescription) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `api/prescriptions/${prescriptionId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedPrescription),
            }
          );
          if (response.ok) {
            const store = getStore();
            await getActions().getPrescriptions(store.patient.id);
          } else {
            console.error("Failed to edit prescription:", response.statusText);
          }
        } catch (error) {
          console.error("Error editing prescription:", error);
        }
      },

      deletePrescription: async (prescriptionId) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `api/prescriptions/${prescriptionId}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            const store = getStore();
            await getActions().getPrescriptions(store.patient.id);
          } else {
            console.error(
              "Failed to delete prescription:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error deleting prescription:", error);
        }
      },
    },
  };
};
export default getState;

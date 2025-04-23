import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";

import { CreateChart } from "./pages/createChart.jsx";
import { SignUp } from "./pages/signUp.jsx";
import { Login } from "./pages/login.jsx";
import { NewSearchEngine } from "./pages/newSearchEngine.jsx";
import { FoundResults } from "./pages/foundResults.jsx";
import { Chart } from "./pages/chart.jsx";
import { EditChart } from "./pages/editChart.jsx";
import { CreateProfile } from "./pages/createProfile.jsx";
import { EditProfile } from "./pages/editProfile.jsx";
import { PrescriptionForm } from "./pages/prescriptionForm.jsx";
import { EditPrescription } from "./pages/editPrescription.jsx";
import { NotFound } from "./pages/notFound.jsx";
import { AddNote } from "./pages/addNote.jsx";
import { AboutUs } from "./pages/aboutUs.jsx";

import injectContext from "./store/appContext";

import { NavbarHandler } from "./component/navbarHandler.jsx";
import { Footer } from "./component/footer.jsx";
import { Profile } from "./component/profile.jsx";
import { AuthWrapper } from "./component/authwrapper.jsx";
import UploadDocsForm from "./component/uploadDocsForm";

const Layout = () => {
  const basename = "/" || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <NavbarHandler>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<SignUp />} path="/signup" />
              <Route element={<Login />} path="/login" />

              <Route element={<UploadDocsForm />} path="/upload" />
              <Route element={<AuthWrapper />} path="/protected">
                <Route element={<CreateProfile />} path="create-profile" />
                <Route element={<AddNote />} path="add-note" />
                <Route element={<EditProfile />} path="edit-profile" />
                <Route element={<Profile />} path="profile" />
                <Route element={<NewSearchEngine />} path="search-improved" />
                <Route element={<FoundResults />} path="found-results" />
                <Route
                  element={<PrescriptionForm />}
                  path="prescription-form"
                />
                <Route
                  path="edit-prescription/:prescriptionId"
                  element={<EditPrescription />}
                />
                <Route element={<CreateChart />} path="create-chart" />
                <Route element={<Chart />} path="chart" />
                <Route element={<EditChart />} path="edit-chart" />
              </Route>
              <Route element={<AboutUs />} path="/about-us" />
              <Route element={<NotFound />} path="/*" />
            </Routes>
          </NavbarHandler>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";

import { CreateChart } from "./pages/createChart";
import { SignUp } from "./pages/signUp";
import { Login } from "./pages/login";
import { Search } from "./pages/searchChart";
import { Chart } from "./pages/chart";
import { EditChart } from "./pages/editChart";
import { CreateProfile } from "./pages/createProfile";
import { EditProfile } from "./pages/editProfile";
import { PrescriptionForm } from "./pages/prescriptionForm";
import { EditPrescription } from "./pages/editPrescription";
import { NotFound } from "./pages/notFound";
import { AddNote } from "./pages/addNote";
import { AboutUs } from "./pages/aboutUs";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Profile } from "./component/profile";
import { AuthWrapper } from "./component/authwrapper";
import UploadDocsForm from "./component/uploadDocsForm";

const Layout = () => {
  const basename = "/" || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
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
              <Route element={<Search />} path="search" />
              <Route element={<PrescriptionForm />} path="prescription-form" />
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
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);

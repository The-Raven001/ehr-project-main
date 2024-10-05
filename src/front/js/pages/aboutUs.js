import React from "react";
import "../../styles/about.css";

export const AboutUs = () => {
  return (
    <div className="d-flex justify-content-center mt-5 maindiv w-50">
      <section className="team-section">
        <h2>Meet the Team</h2>
        <p>Learn more about the individuals behind this website.</p>
        <div className="team-container">
          <div className="team-member">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="Gabriel Cumare"
            ></img>
            <h3>Gabriel Cumare</h3>
            <h4>Web Developer</h4>
            <a
              href="https://github.com/The-Raven001"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit GitHub
            </a>
          </div>
          <div className="team-member">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="Sebastian Masia"
            ></img>
            <h3>Sebastian Masia</h3>
            <h4>Web Developer</h4>
            <a
              href="https://github.com/sebas-masia"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit GitHub
            </a>
          </div>
          <div className="team-member">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="Cesar Saldivar"
            ></img>
            <h3>Cesar Saldivar</h3>
            <h4>Web Developer</h4>
            <a
              href="https://github.com/Cesarzaldivar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Image } from "react-bootstrap";
import { FaInstagram, FaTwitter, FaFacebook, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <footer className="text-center text-lg-start text-light bg-dark pt-5">
      <section className="container text-center text-md-start mt-4">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
            <div className="d-flex align-items-center mb-3">
              <h6 className="text-uppercase fw-bold mb-0">
                <i className="bi bi-clock"></i> AttendancePlus
              </h6>
              <Image
                src="src/images/attendance_logo.png"
                width="70"
                height="60"
                alt="logo"
                className="me-4"
              />
            </div>
            <p>
              Keep track of attendance efficiently! Manage student and employee records with ease.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Quick Links</h6>
            <p>
              <a href="/" className="text-light text-decoration-none">
                Home
              </a>
            </p>
            <p>
              <a href="/attendance" className="text-light text-decoration-none">
                Attendance
              </a>
            </p>
            <p>
              <a href="/about" className="text-light text-decoration-none">
                About Us
              </a>
            </p>
            <p>
              <a href="/contact" className="text-light text-decoration-none">
                Contact
              </a>
            </p>
          </div>

          <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Features</h6>
            <p>
              <i className="bi bi-check-circle-fill me-2"></i> Real-Time Tracking
            </p>
            <p>
              <i className="bi bi-check-circle-fill me-2"></i> Automated Reports
            </p>
            <p>
              <i className="bi bi-check-circle-fill me-2"></i> Secure Database
            </p>
            <p>
              <i className="bi bi-check-circle-fill me-2"></i> Multi-User Support
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
            <Col>
              <p><FaInstagram /> <a href="https://www.instagram.com/dhruv_chauhan_275">Instagram</a></p>
              <p><FaTwitter /> <a href="https://twitter.com/yourprofile">Twitter</a></p>
              <p><FaFacebook /> <a href="https://www.facebook.com/yourprofile">Facebook</a></p>
              <p><FaEnvelope /> <strong>Email:</strong> dhruv03chauhan@gmail.com</p>
            </Col>
          </div>
        </div>
      </section>

      <div className="text-center p-3 bg-black">
        © 2025 AttendancePlus. All Rights Reserved.
      </div>
    </footer>
    </div>
  );
}

export default Footer;

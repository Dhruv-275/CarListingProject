import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const About = () => {
  const navigate = useNavigate();

  return (
    <section
      className="container-fluid text-center text-white py-5"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      <div className="container position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h6 className="text-warning fw-bold">ABOUT US</h6>
            <h1 className="fw-bold">
              Welcome to <span className="text-warning">AttendancePlus</span>
            </h1>
            <p className="text-light">
              Your reliable solution for managing attendance effortlessly. Whether you're tracking student attendance or employee check-ins, AttendancePlus provides a seamless and efficient system to keep records accurate and up to date.
            </p>

            <div className="row justify-content-center text-center mb-4">
              <div className="col-md-4">
                <h2 className="text-warning fw-bold">1k+</h2>
                <p className="fw-semibold">Attendances Tracked</p>
              </div>
              <div className="col-md-4">
                <h2 className="text-warning fw-bold">10</h2>
                <p className="fw-semibold">Registered Users</p>
              </div>
              <div className="col-md-4">
                <h2 className="text-warning fw-bold">10+</h2>
                <p className="fw-semibold">Organizations Using Us</p>
              </div>
            </div>

            <Button className="btn btn-warning fw-bold px-4 py-2" onClick={() => navigate("/")}>Track Attendance</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

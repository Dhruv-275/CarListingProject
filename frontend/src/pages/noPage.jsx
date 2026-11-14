import React from "react";
import { useNavigate } from "react-router-dom";


export default function NoPage() {
 const navigate = useNavigate()

 function handleButton(){
  navigate("/home")
 }


  return (
    <div className="private-no-page">
      <h1 className="bold-text">Sorry, this page isn't available.</h1>
      <p>
        The link you followed may be broken, or the page may have been removed
      </p>
      <button className="home-button" onClick={handleButton}>
        Go to Homepage
      </button>
    </div>
  );
}

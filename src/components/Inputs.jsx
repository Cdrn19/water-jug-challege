import React, { useState, useRef } from "react";
import { useChallenge } from "../hook/useChallenge";
import "../styles/Inputs.css";

const Inputs = () => {
    const form = useRef(null);
  const [toggle, setToggle] = useState(false);
  const{ waterJugChallenge, catchError } = useChallenge();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      x: formData.get("x"),
      y: formData.get("y"),
      z: formData.get("z"),
    };
    if (data.x <= 0 || data.y <= 0 || data.z <= 0) {
      setToggle(true)
      catchError("make sure to put integers")
    } else {
      setToggle(false)
      catchError(null)
      waterJugChallenge(data)
    }
  };


  return (
    <div className="inputs__container">
      <form className="inputs__form" ref={form}>
          <input
            type="number"
            name="x"
            placeholder="Bucket X"
            className={`inputs__form--input ${toggle && "error"}`}
          />         
        <input
          type="number"
          name="y"
          placeholder="Bucket Y"
          className={`inputs__form--input ${toggle && "error"}`}
        />          
      <input
        type="number"
        name="z"
        placeholder="Amount wated Z"
        className={`inputs__form--input ${toggle && "error"}`}
      />
      </form>
      <button className="inputs__form--btn" onClick={handleSubmit}>
          Challenge
      </button>
    </div>
  )
}

export default Inputs
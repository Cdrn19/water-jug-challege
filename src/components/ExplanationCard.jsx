import React from "react";
import "../styles/ExplanationCard.css"

const ExplanationCard = ({ solution }) => {
  const { state } = solution
  const [ operation ] = Object.keys(solution)
  return (
    <div className="explanationCard__develop">
        <div className="explanationCard--bucketX">
          <h5>{state[0]}</h5>
        </div>
        <div className="explanationCard--bucketY">
          <h5>{state[1]}</h5>
        </div>
        <div className="explanationCard--explanation">
          <h5>{operation}</h5>
        </div>
      </div>
  )
}

export default ExplanationCard;
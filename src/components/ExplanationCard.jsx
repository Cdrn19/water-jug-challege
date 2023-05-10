import React from "react";
import "../styles/ExplanationCard.css"

const ExplanationCard = ({ solution, data }) => {
  const { big, small } = solution;
  const { x , y } = data
  const bigBucket = x <= y ? false : true;

  const [ operation ] = Object.keys(solution)

  return (
    <div className="explanationCard__develop">
        <div className="explanationCard--bucketX">
          <h5>{bigBucket ? big : small}</h5>
        </div>
        <div className="explanationCard--bucketY">
          <h5>{!bigBucket ? big : small}</h5>
        </div>
        <div className="explanationCard--explanation">
          <h5>{operation}</h5>
        </div>
      </div>
  )
}

export default ExplanationCard;
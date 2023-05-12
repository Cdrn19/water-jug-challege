import React from "react";
import "../styles/ExplanationCard.css";

const ExplanationCard = ({ solution, data, solved }) => {
  const { big, small } = solution;
  const { x, y } = data;
  const bigBucket = parseInt(x) >= parseInt(y);
  const [operation] = Object.keys(solution);

  return (
    <>
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
      {solved && <div className="explanationCard__solved">Solved</div>}
    </>
  );
};

export default ExplanationCard;

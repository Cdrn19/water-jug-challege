import { useState, useContext, createContext } from "react";

const ChallengeContext = createContext();

export function ProviderChallenge({ children }) {
  const challenge = useProvideChallenge();
  return <ChallengeContext.Provider value={challenge}>{children}</ChallengeContext.Provider>;
}

export const useChallenge = () => {
  return useContext(ChallengeContext);
};

function useProvideChallenge() {
  const [error, setError] = useState(null);
  const [solutions, setSolutions] = useState([]); 

  const waterJugChallenge = (data) => {
    const { x, y, z: amountWasted } = data
  let bigBucket = 0;
  let smallBucket = 0;
  let operation = []

  const lowerCapacity = Math.min(x, y)
  const greaterCapacity = Math.max(x, y)
  const orderBucket = x >= y ? ["x", "y"] : ["y", "x"];
  
  function bucketFill() {
    if(lowerCapacity <= amountWasted){
      return lowerCapacity < amountWasted ? lowerCapacity : amountWasted;
    } else if (greaterCapacity <= amountWasted) {
      return greaterCapacity < amountWasted ? greaterCapacity : amountWasted;
    } else {
      return greaterCapacity
    }
  }

  function bucketTransfer() {
    smallBucket = bigBucket
    return bigBucket = 0
  }

  do {
    bigBucket = bigBucket ? 0 : bucketFill();
    operation.push({fill: orderBucket[0], state: [bigBucket, smallBucket]})
    smallBucket !== lowerCapacity && bucketTransfer();
    operation.push({transfer: orderBucket, state: [bigBucket, smallBucket]})
    if (bigBucket + smallBucket < amountWasted) {
      bigBucket = bigBucket ? 0 : bucketFill();
      operation.push({fill: orderBucket[0], state: [bigBucket, smallBucket]})
      break;
    }
  } while (bigBucket + smallBucket < amountWasted);


    
    setSolutions(operation)
  }

  const catchError = (err) => {
    setError(err)
  }
  
  return { waterJugChallenge, solutions, catchError, error }
}
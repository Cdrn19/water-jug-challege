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
    const { x, y, z} = data;

    const amountWasted = parseInt(z)
    let buckets = { bigBucket: 0, smallBucket: 0 }
    let operation = [];

    const lowerCapacity = Math.min(x, y);
    const greaterCapacity = Math.max(x, y);

    const mcd = (x, y) => {

      let value; 
      while (y !== 0) {
          value = y;
          y = x % y;
          x = value;
      }
      return x;
    };
  
    function fillBucket (){
      let fill = {}
  
      function big(min) {
        let qty = min || greaterCapacity
  
          fill["fill"] = buckets.bigBucket = qty;
          fill["bucket"] = "bigBucket";
          fill["big"] = buckets.bigBucket;
          fill["small"] = buckets.smallBucket;
        };
  
      function small(min) {
        let qty = min || lowerCapacity
        
        fill["fill"] = buckets.smallBucket = qty;
        fill["bucket"] = "smallBucket";
        fill["big"] = buckets.bigBucket;
        fill["small"] = buckets.smallBucket;
      }
  
      operation.push(fill);
      return {
        big,
        small,
      }      
    };
  
    function emptyBucket() {     
      let empty = {}
  
      function big() {
          empty["empty"] = buckets.bigBucket = 0;
          empty["bucket"] = "bigBucket";
          empty["big"] = buckets.bigBucket;
          empty["small"] = buckets.smallBucket;
        };
  
      function small() {
        empty["empty"] = buckets.smallBucket = 0;
        empty["bucket"] = "smallBucket";
        empty["big"] = buckets.bigBucket;
        empty["small"] = buckets.smallBucket;
      }
  
      operation.push(empty);

      return {
        big,
        small,
      }   
    };
  
    function transferBucket(){
      let transfer = {}; 
  
      function bigToSmall() {
        let capacity = 0;
  
        if (buckets.bigBucket > lowerCapacity && !buckets.smallBucket) {
          capacity = lowerCapacity;
          buckets.smallBucket = capacity
        } else if (buckets.bigBucket && buckets.smallBucket) {
          capacity = lowerCapacity - buckets.smallBucket;
          buckets.smallBucket = buckets.smallBucket + capacity
        } else if (buckets.bigBucket && !buckets.smallBucket) {
          capacity = buckets.bigBucket - buckets.smallBucket;
          buckets.smallBucket = buckets.smallBucket + capacity
        }
  
        transfer["transfer"] = capacity;
        buckets.bigBucket = buckets.bigBucket - capacity;
        transfer["bucket"] = "bigToSmall";
        transfer["big"] = buckets.bigBucket;
        transfer["small"] = buckets.smallBucket;
      }
  
      function smallToBig() {
        let capacity = 0;
  
        if (buckets.smallBucket > greaterCapacity && !buckets.bigBucket) {
          capacity = lowerCapacity;
          buckets.bigBucket = capacity;
        }else if(buckets.bigBucket && buckets.smallBucket) {
          capacity = greaterCapacity - buckets.bigBucket;
          buckets.bigBucket = buckets.bigBucket + capacity
        } else if(buckets.smallBucket && !buckets.bigBucket) {
          capacity = buckets.smallBucket;
          buckets.bigBucket = buckets.bigBucket + capacity
        } 
  
        transfer["transfer"] = capacity;
        buckets.smallBucket = buckets.smallBucket - capacity;
        transfer["bucket"] = "smallToBig";
        transfer["big"] = buckets.bigBucket;
        transfer["small"] = buckets.smallBucket;
      }
  
      operation.push(transfer);
  
      return {
        bigToSmall,
        smallToBig,
       }




    }
  
  
    function from() {
    
      function bigToSmall(){
    
        do {
          if (buckets.bigBucket === amountWasted || buckets.smallBucket === amountWasted) break;
          !buckets.bigBucket && fillBucket().big();
          if (buckets.bigBucket === amountWasted || buckets.smallBucket === amountWasted) break;
          buckets.bigBucket && transferBucket().bigToSmall();
          if (buckets.bigBucket === amountWasted || buckets.smallBucket === amountWasted) break;
          buckets.bigBucket && emptyBucket().small();
        } while (buckets.smallBucket <= amountWasted);
        
      }
    
      function smallToBig() {
  
        do {
          if (buckets.bigBucket === amountWasted || buckets.smallBucket === amountWasted) break;
          !buckets.smallBucket && fillBucket().small();
          if (buckets.bigBucket === amountWasted || buckets.smallBucket === amountWasted) break;
          buckets.smallBucket && transferBucket().smallToBig();
          if (buckets.bigBucket === amountWasted || buckets.smallBucket === amountWasted) break;
          buckets.smallBucket && emptyBucket().big();
        } while (buckets.smallBucket <= amountWasted);
    
      }
    
      return {
        bigToSmall,
        smallToBig,
      }
    }
  
  if((amountWasted <= greaterCapacity)){  

    if((greaterCapacity === amountWasted) || (lowerCapacity === amountWasted)){
  
      if (lowerCapacity === amountWasted){ 
  
        fillBucket().small()
  
    } else {
  
        fillBucket().big()
  
      }
  
      } else {      
  
      return setError("without solution in process...")
  
    } 
        
        } else {
  
    return setError("without solution")
  
    }

  setSolutions([operation, data]);
  
  }

  const catchError = (err) => {
    setError(err)
  }
  
  return { waterJugChallenge, solutions, catchError, error }
}
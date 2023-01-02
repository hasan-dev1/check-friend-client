import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation()
    return (
      <div className="min-h-[80vh] lg:w-3/5 md:w-3/5  lg:mx-auto md:mx-auto mx-[20px] lg:py-32 pt-16 flex justify-center items-center">
        <div className="flex  flex-col justify-center items-center">
          <h4 className='text-2xl mb-2'>
            Your Total Score is : <span>{location?.pathname.split("/")[2]}</span>
          </h4>
          <Link to={"/"} className={`btn btn-sm pt-1 bg-primary`}>Back to Home</Link>
        </div>
      </div>
    );
};

export default Result;
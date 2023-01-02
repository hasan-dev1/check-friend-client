import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Services = () => {

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mx-auto my-12 w-4/5">
      <div className="card bg-gradient-to-r from-[#6df778] to-[#62B6B7] rounded text-white shadow-xl">
        <div className="card-body items-center text-start">
          <h2 className="card-title">Check FriendShip</h2>
          <p>
            Create a List and send Your Friend and see what he know About You
          </p>
          <div className="flex justify-end w-full ">
            <Link
              to={`/childdetails`}
              className="flex btn btn-sm text-white border-0 justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded"
            >
              <span className="mr-2 mt-1 ">Next</span>{" "}
              <FaArrowRight></FaArrowRight>
            </Link>
          </div>
        </div>
      </div>
      <div className="card bg-gradient-to-r from-[#6df778] to-[#62B6B7] rounded text-white shadow-xl">
        <div className="card-body items-center text-start">
          <h2 className="card-title">Create a voting system</h2>
          <p>
            Create a pool and send other to voting
          </p>
          <div className="flex justify-end w-full ">
            <Link
              to={`/childdetails`}
              className="flex btn btn-sm text-white border-0 justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded"
            >
              <span className="mr-2 mt-1 ">Next</span>{" "}
              <FaArrowRight></FaArrowRight>
            </Link>
          </div>
        </div>
      </div>
      <div className="card bg-gradient-to-r from-[#6df778] to-[#62B6B7] rounded text-white shadow-xl">
        <div className="card-body items-center text-start">
          <h2 className="card-title">Anonnymouse Messging</h2>
          <p>
            Create a Test area field and send Your Friend and see what he said About You
          </p>
          <div className="flex justify-end w-full ">
            <Link
              to={`/childdetails`}
              className="flex btn btn-sm text-white border-0 justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded"
            >
              <span className="mr-2 mt-1 ">Next</span>{" "}
              <FaArrowRight></FaArrowRight>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

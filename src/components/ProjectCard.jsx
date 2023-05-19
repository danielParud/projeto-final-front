import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard(props) {
  return (
    <React.Fragment>
      <Link to={props.projectLink}>
        <div className="max-w-md p-6 bg-gray-200 border border-gray-200 rounded-lg shadow">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {props.projectName}
          </h5>
          <div className="flex justify-center items-start w-full">
            <img src={props.imageUrl} className="w-full h-full rounded-lg" />
          </div>
          <p className="mb-2 text-md font-normal tracking-tight text-gray-900">
            {props.creator}
          </p>
          {props.status === "To be started" ? (
            <p className="text-center focus:outline-none text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2">
              {props.status}
            </p>
          ) : null}
          {props.status === "On going" ? (
            <p className="text-center focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2">
              {props.status}
            </p>
          ) : null}
          {props.status === "Completed" ? (
            <p className="text-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2">
              {props.status}
            </p>
          ) : null}
        </div>
      </Link>
    </React.Fragment>
  );
}

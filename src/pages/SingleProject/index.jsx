import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import { VIEWS } from "../../utils/routes";
import TopNavigation from "../../components/TopNavigation";
import SideNavigation from "../../components/SideNavigation";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import InputField from "../../components/InputField";

export default function SingleProject() {
  const [authToken, setAuthToken] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [projectDetails, setProjectDetails] = useState("");
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");
  const projectNameRef = useRef(null);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const currentUserToken = localStorage.getItem("loggedInUser");
    setAuthToken(currentUserToken);
    getProjectDetails(currentUserToken);
    getComments(currentUserToken);
  }, []);

  const getProjectDetails = async (authToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoadingSpinner(true);
      const response = await axios.get(
        `http://localhost:4000/api/project/${projectId}`,
        config
      );
      setProjectDetails(response.data);
      setProjectName(response.data.name);
      setLoadingSpinner(false);
    } catch (error) {
      setLoadingSpinner(false);
      toast.error(error.message);
    }
    setLoadingSpinner(false);
  };

  const deleteProject = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoadingSpinner(true);
      await axios.delete(
        `http://localhost:4000/api/project/${projectId}`,
        config
      );
      setLoadingSpinner(false);
      navigate(-1);
    } catch (error) {
      setLoadingSpinner(false);
      toast.error(error.message);
    }
    setLoadingSpinner(false);
  };

  const focusToProjectName = () => {
    projectNameRef.current.focus();
  };

  const updateProjectName = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoadingSpinner(true);
      const response = await axios.put(
        `http://localhost:4000/api/project/${projectId}`,
        {
          name: projectName,
        },
        config
      );
      setLoadingSpinner(false);
    } catch (error) {
      setLoadingSpinner(false);
      toast.error(error.message);
    }
    setLoadingSpinner(false);
  };

  const addCommentToProject = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoadingSpinner(true);
      const response = await axios.post(
        `http://localhost:4000/api/comment`,
        {
          comment: comment,
          projectId: projectId,
        },
        config
      );
      setComment("");
      getComments(authToken);
      setLoadingSpinner(false);
    } catch (error) {
      setLoadingSpinner(false);
      toast.error(error.message);
    }
    setLoadingSpinner(false);
  };

  const getComments = async (authToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoadingSpinner(true);
      const response = await axios.get(
        `http://localhost:4000/api/comment/${projectId}`,
        config
      );
      setAllComments(response.data || []);
      setLoadingSpinner(false);
    } catch (error) {
      setLoadingSpinner(false);
      toast.error(error.message);
    }
    setLoadingSpinner(false);
  };

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    // setLoggedInUser(null);
    navigate(VIEWS.HOME);
  }

  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white">
        <TopNavigation buttonName="Log Out" buttonAction={handleLogOut} />
        <SideNavigation isActiveMyBoards={false} isActiveTeam={false} />
        <div className="h-full ml-14 mt-12 md:ml-72">
          <div className="flex flex-row items-baseline">
            <input
              ref={projectNameRef}
              className="text-3xl font-bold leading-none lg:text-4xl xl:text-5xl w-auto"
              contentEditable="true"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={updateProjectName}
            />
            <div className="flex flex-row ml-5">
              <PencilIcon
                className="h-5 w-5 text-gray-400 mx-1 cursor-pointer"
                onClick={focusToProjectName}
              />
              <TrashIcon
                className="h-5 w-5 text-gray-400 mx-1 cursor-pointer"
                onClick={deleteProject}
              />
            </div>
          </div>
          <div className="w-11/12 h-auto ml-8 my-12">
            <div className="flex justify-center items-start w-50">
              {/* <img
                src={projectDetails.image.url}
                className="w-full h-full rounded-lg"
              /> */}
            </div>
            <p>Name : {projectDetails.name}</p>
            <p>Creator : {projectDetails.creator}</p>
            <p>Start Date : {projectDetails.startDate}</p>
            <p className="mb-3">Due Date : {projectDetails.dueDate}</p>
            {projectDetails.status === "To be started" ? (
              <p className="w-fit focus:outline-none text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                {projectDetails.status}
              </p>
            ) : null}
            {projectDetails.status === "On going" ? (
              <p className="w-fit focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                {projectDetails.status}
              </p>
            ) : null}
            {projectDetails.status === "Completed" ? (
              <p className="w-fit focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                {projectDetails.status}
              </p>
            ) : null}
            <div>
              <div className="mt-16 w-full max-w-sm bg-white p-8 rounded-md shadow-md">
                <InputField
                  label="Comment"
                  type="text"
                  placeholder="Write your comment here"
                  value={comment}
                  onChange={setComment}
                />
                <button
                  className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                  type="submit"
                  onClick={addCommentToProject}
                >
                  Add comment
                </button>
                {allComments
                  .map((item, index) => <p key={index.toString()} className="mt-5">{item.comment}</p>)
                  .reverse()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}

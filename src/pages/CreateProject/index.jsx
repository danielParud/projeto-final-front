import React, { useContext, useEffect, useState } from "react";
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
import InputField from "../../components/InputField";

export default function CreateProject() {
  const [authToken, setAuthToken] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("id");

  useEffect(() => {
    const currentUserToken = localStorage.getItem("loggedInUser");
    setAuthToken(currentUserToken);
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const createNewProject = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    if (name === "" || status === "") {
      toast.error("Please enter all the fields..!!");
    } else {
      try {
        setLoadingSpinner(true);
        const response = await axios.post(
          `http://localhost:4000/api/project`,
          {
            name,
            status,
            boardId,
            image,
            startDate,
            dueDate,
          },
          config
        );
        setName("");
        setStatus("");
        setLoadingSpinner(false);
        navigate(-1);
      } catch (error) {
        setLoadingSpinner(false);
        toast.error(error.message);
      }
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
        <SideNavigation isActiveMyBoards={true} isActiveTeam={false} />
        <div className="h-full ml-14 mt-12 md:ml-72">
          <h1 className="text-3xl font-bold leading-none lg:text-4xl xl:text-5xl">
            Create New Project
          </h1>
          <div className="w-11/12 h-auto ml-8 my-12">
            <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
              <InputField
                label="Name"
                type="text"
                placeholder="Project Name"
                value={name}
                onChange={setName}
              />
              <InputField
                label="Start Date"
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={setStartDate}
              />
              <InputField
                label="Due Date"
                type="date"
                placeholder="Due Date"
                value={dueDate}
                onChange={setDueDate}
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              >
                <option value="" disabled>
                  Select Project Status
                </option>
                <option value="To be started">To be started</option>
                <option value="On going">On going</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                onChange={handleImage}
                type="file"
                id="formUpload"
                name="image"
                className="mt-4 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              <button
                className="mt-5 w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                type="submit"
                onClick={createNewProject}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      </div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}

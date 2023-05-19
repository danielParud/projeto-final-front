import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function CreateBoard() {
  const [authToken, setAuthToken] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUserToken = localStorage.getItem("loggedInUser");
    setAuthToken(currentUserToken);
  }, []);

  const createNewBoard = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    if (name === "" || description === "") {
      toast.error("Please enter all the fields..!!");
    } else {
      try {
        setLoadingSpinner(true);
        const response = await axios.post(
          `http://localhost:4000/api/board`,
          {
            name,
            description,
          },
          config
        );
        setName("");
        setDescription("");
        setLoadingSpinner(false);
        navigate(VIEWS.DASHBOARD);
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
            Create New Board
          </h1>
          <div className="w-11/12 h-auto ml-8 my-12">
            <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
              <InputField
                label="Name"
                type="text"
                placeholder="Board Name"
                value={name}
                onChange={setName}
              />
              <InputField
                label="description"
                type="text"
                placeholder="Some text going here..."
                value={description}
                onChange={setDescription}
              />
              <button
                className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                type="submit"
                onClick={createNewBoard}
              >
                Create Board
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

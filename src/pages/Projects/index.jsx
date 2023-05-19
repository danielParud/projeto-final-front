import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VIEWS } from "../../utils/routes";
import { AuthContext } from "../../contexts/authContext";
import TopNavigation from "../../components/TopNavigation";
import SideNavigation from "../../components/SideNavigation";
import ProjectCard from "../../components/ProjectCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Projects() {
  //const { setLoggedInUser } = useContext(AuthContext);

  //=============================================================================================

  const [authToken, setAuthToken] = useState("");
  const [allBoardProjects, setAllBoardProjects] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [boardName, setBoardName] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("id");
  const boardNameRef = useRef(null);

  useEffect(() => {
    const currentUserToken = localStorage.getItem("loggedInUser");
    setAuthToken(currentUserToken);
    getBoardDetails(currentUserToken);
    getAllBoardProjects(currentUserToken);
  }, []);

  const getBoardDetails = async (authToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoadingSpinner(true);
      const response = await axios.get(
        `http://localhost:4000/api/board/${boardId}`,
        config
      );
      setBoardName(response.data.name);
      setLoadingSpinner(false);
    } catch (error) {
      setLoadingSpinner(false);
      toast.error(error.message);
    }
    setLoadingSpinner(false);
  };

  const getAllBoardProjects = async (authToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoadingSpinner(true);
      const response = await axios.post(
        `http://localhost:4000/api/project/board-projects`,
        {
          boardId,
        },
        config
      );
      setAllBoardProjects(response.data || []);
      setLoadingSpinner(false);
    } catch (error) {
      setLoadingSpinner(false);
      toast.error(error.message);
    }
    setLoadingSpinner(false);
  };

  const deleteBoard = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoadingSpinner(true);
      const response = await axios.delete(
        `http://localhost:4000/api/board/${boardId}`,
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

  const focusToBoardName = () => {
    boardNameRef.current.focus();
  };

  const updateBoardName = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoadingSpinner(true);
      const response = await axios.put(
        `http://localhost:4000/api/board/${boardId}`,
        {
          name: boardName,
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

  function createProjectPage() {
    navigate(`${VIEWS.CREATEPROJECT}?id=${boardId}`);
  }

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
              ref={boardNameRef}
              className="text-3xl font-bold leading-none lg:text-4xl xl:text-5xl w-auto"
              contentEditable="true"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              onBlur={updateBoardName}
            />
            <div className="flex flex-row ml-5">
              <PencilIcon
                className="h-5 w-5 text-gray-400 mx-1 cursor-pointer"
                onClick={focusToBoardName}
              />
              <TrashIcon
                className="h-5 w-5 text-gray-400 mx-1 cursor-pointer"
                onClick={deleteBoard}
              />
            </div>
          </div>
          <div className="w-11/12 h-auto ml-8 my-12">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={createProjectPage}
            >
              Create Project
            </button>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200"></hr>
            <div className="grid grid-cols-4 gap-3 mt-14">
              {allBoardProjects
                .map((item, index) => (
                  <ProjectCard
                    key={index.toString()}
                    projectName={item.name}
                    creator={item.creator}
                    status={item.status}
                    imageUrl={item.image.url}
                    projectLink={`${VIEWS.SINGLEPROJECT}?id=${item._id}`}
                  />
                ))
                .reverse()}
            </div>
          </div>
        </div>
      </div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}

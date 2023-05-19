import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import { VIEWS } from "../../utils/routes";
import TopNavigation from "../../components/TopNavigation";
import SideNavigation from "../../components/SideNavigation";
import BoardCard from "../../components/BoardCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

export function Profile() {
  const { loggedInUser } = useContext(AuthContext);

  //=============================================================================================

  const [authToken, setAuthToken] = useState("");
  const [userName, setUserName] = useState("");
  const [allUserBoards, setAllUserBoards] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUserToken = localStorage.getItem("loggedInUser");
    setAuthToken(currentUserToken);
    const decodedToken = jwtDecode(currentUserToken);
    setUserName(decodedToken.name);
    getAllUserBoards(currentUserToken);
  }, []);

  const getAllUserBoards = async (authToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      setLoadingSpinner(true);
      const response = await axios.get(
        `http://localhost:4000/api/board/user-boards`,
        config
      );
      setAllUserBoards(response.data || []);
      setLoadingSpinner(false);
    } catch (error) {
      setLoadingSpinner(false);
      toast.error(error.message);
    }
    setLoadingSpinner(false);
  };

  function createBoardPage() {
    navigate(VIEWS.CREATEBOARD);
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
        <SideNavigation isActiveMyBoards={true} isActiveTeam={false} />
        <div className="h-full ml-14 mt-12 md:ml-72">
          <h1 className="text-3xl font-bold leading-none lg:text-4xl xl:text-5xl">
            Hi, {userName}
          </h1>
          <div className="w-11/12 h-auto ml-8 my-12">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={createBoardPage}
            >
              Create Board
            </button>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200"></hr>
            <h6 className="text-md font-semibold leading-none lg:text-lg xl:text-xl text-neutral-500">
              Click in one of your boards bellow to start or search in the
              search bar
            </h6>
            <div className="grid grid-cols-2 gap-3 mt-14">
              {allUserBoards
                .map((item, index) => (
                  <BoardCard
                    key={index.toString()}
                    cardName={item.name}
                    description={item.description}
                    boardLink={`${VIEWS.PROJECTS}?id=${item._id}`}
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

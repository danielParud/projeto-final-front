import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { VIEWS } from '../../utils/routes';
import { AuthContext } from '../../contexts/authContext';
import TopNavigation from '../../components/TopNavigation';
import SideNavigation from '../../components/SideNavigation';

export default function Team() {

    const { setLoggedInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogOut() {
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
        navigate(VIEWS.HOME);
      }

    return (
        <React.Fragment>
          <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white">
            <TopNavigation buttonName="Log Out" buttonAction={handleLogOut} />
            <SideNavigation 
              isActiveMyBoards={false}
              isActiveTeam={true}
            />
            <div className="h-full ml-14 mt-12 md:ml-72">
              <h1 className="text-3xl font-bold leading-none lg:text-4xl xl:text-5xl">Team</h1>
              <div className="w-6/12 h-auto ml-8 my-12"></div>
            </div>
          </div>
        </React.Fragment>
      );
}

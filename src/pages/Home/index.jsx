import { HomeIcon } from "@heroicons/react/24/solid";
import React from "react";


import TopNavigation from "../../components/TopNavigation";
import HomeHeader from "../../components/HomeHeader";
import { VIEWS } from "../../utils/routes";
import { useNavigate } from "react-router-dom";

export function Home() {

  const navigate = useNavigate();

  function navigateToLogin() {
    navigate(VIEWS.SIGNIN);
  }

  return (
    <React.Fragment>
      <TopNavigation buttonName="Login" buttonAction={navigateToLogin} />
      <HomeHeader 
        primaryText="List, Organize & track the progress of your project"
        secondaryText="All in one place"
      />
    </React.Fragment>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { VIEWS } from "../../utils/routes";
import TopNavigation from "../../components/TopNavigation";

export const Error = () => {

  const navigate = useNavigate();

  function navigateToHome() {
    navigate(VIEWS.HOME);
  }

  return (
    <React.Fragment>
      <TopNavigation buttonName="Login" buttonAction={navigateToHome} />
      <section className="flex items-center h-full p-16">
        <div className="h-full container flex flex-col items-center justify-center p-32 mx-auto">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl mb-20">
              Sorry, page not found..!!.
            </p>
            <Link
              rel="noopener noreferrer"
              to={VIEWS.HOME}
              className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

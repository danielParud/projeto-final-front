import React from "react";
import { VIEWS } from "../utils/routes";
import { Link } from "react-router-dom";

export default function SideNavigation(props) {
  return (
    <React.Fragment>
      <div className="fixed flex flex-col top-0 left-0 w-14 hover:w-64 md:w-64 bg-gray-800 h-full text-white transition-all duration-300 border-none z-10 sidebar">
        <h1 className="mt-16 text-center text-4xl font-bold dark:text-white">EasyPlan</h1>
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1 mt-24 px-5">
            <li className="py-3">
              <Link
                className={
                  props.isActiveMyBoards
                    ? "flex items-center py-2 px-4 text-gray-900 rounded-lg dark:text-white bg-gray-700"
                    : "flex items-center py-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                to={VIEWS.DASHBOARD}
              >
                My Boards
              </Link>
            </li>
            <li className="py-3">
              <Link
                className={
                  props.isActiveTeam
                    ? "flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white bg-gray-700"
                    : "flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                to={VIEWS.TEAM}
              >
                Team
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

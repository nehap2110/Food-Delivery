import React, { useContext } from "react";
import { links } from "../../assets/index";
import LinkItem from "./LinkItem";
import { appContext } from "../../context/appContext";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = ({ isSidebarOpen }) => {
  const { logout } = useContext(appContext);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200
      sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {links.map((link, index) => (
            <LinkItem key={index} {...link} />
          ))}
          <li>
            <button
              onClick={logout}
              className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <IoIosLogOut className="mr-2" />
              <span className="flex-1 text-left">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

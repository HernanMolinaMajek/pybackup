import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ authenticated, userName, logOut }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toogleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <nav className="flex flex-col items-start bg-white mb-3 lg:flex-row lg:justify-between lg:items-center lg:mx-5 relative ">
      <div className="flex flex-row w-full items-center p-5 justify-between lg:w-1/2 ">
        <div onClick={toogleMenu} className="text-gray-600 lg:hidden">
          <svg fill="#969696" viewBox="0 0 100 80" width="25" height="25">
            <rect x="25" width="50" height="10" rx="8"></rect>
            <rect y="30" width="100" height="10" rx="8"></rect>
            <rect x="25" y="60" width="50" height="10" rx="8"></rect>
          </svg>
        </div>

        <div className="flex flex-row">
          <Link
            onClick={() => {
              setIsMenuActive(false);
            }}
            to={"/"}
          >
            <h1 className="text-red-400">Perdidos ya</h1>
          </Link>
        </div>

        <div className=""></div>
      </div>

      <div className={`${isMenuActive ? "" : "hidden"} lg:flex`}>
        <div className="text-md bg-gray-800 text-white absolute items-center top-0 mt-16 py-2 pl-5 z-40 w-screen lg:relative lg:w-full lg:mt-0 lg:justify-center lg:flex-row ">
          {authenticated ? (
            <div>
              <div className="block lg:inline-block lg:mt-0 hover:text-white lg:mx-6 ">
                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/userAdmin"}
                >
                  {userName}
                </Link>
              </div>
              <div className="block mt-4 lg:inline-block lg:mt-0  hover:text-white lg:mx-6 ">
                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/"}
                >
                  Home
                </Link>
              </div>
              <div className="block mt-4 lg:inline-block lg:mt-0  hover:text-white lg:mx-6 ">
                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/petAdmin"}
                >
                  Mis mascotas
                </Link>
              </div>

              <div
                onClick={logOut}
                className="block mt-4 lg:inline-block lg:mt-0  hover:text-white lg:mx-6 "
              >
                Cerrar sesion
              </div>
            </div>
          ) : (
            <div>
              <div className="block lg:inline-block lg:mt-0 hover:text-white lg:mx-6 lg:hidden ">
                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/"}
                >
                  Home
                </Link>
              </div>
              <div className="block mt-4  lg:inline-block lg:mt-0  hover:text-white lg:mx-6 ">
                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/register"}
                >
                  Registrase
                </Link>
              </div>
              <div className="block mt-4 lg:inline-block lg:mt-0 hover:text-white lg:mx-6 ">
                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/login"}
                >
                  Iniciar sesion
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

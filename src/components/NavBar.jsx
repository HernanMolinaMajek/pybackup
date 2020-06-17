import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ authenticated, userName, logOut }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(true);

  const toogleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <nav className="flex flex-col items-start bg-white mb-3 p-5 lg:flex-row ">
      <div className="flex flex-row w-full items-center justify-between ">
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

      <div
        className={`${isMenuActive ? "" : "hidden"} lg:flex lg:items-center`}
      >
        <div className="text-sm">
          {authenticated ? (
            <div>
              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white ">
                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/userAdmin"}
                >
                  {userName}
                </Link>
              </div>
              <div className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
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
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                Cerrar sesion
              </div>
            </div>
          ) : (
            <div>
              <a
                href="formulario de inicio de sesion"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/register"}
                >
                  Registrase
                </Link>
              </a>
              <a
                href="formulario de inicio de sesion"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/login"}
                >
                  Iniciar sesion
                </Link>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

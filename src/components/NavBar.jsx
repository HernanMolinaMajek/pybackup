import React, { useEffect, useState } from "react";

const NavBar = ({ user }) => {
  const {name} = user
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

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
          <h1>Perdidos ya</h1>
        </div>
      
        <div className="">
        </div>
      </div>
      
      <div className={`${isMenuActive ? "" : "hidden"} lg:flex lg:items-center`}>
        <div className="text-sm">
          {isUserLogged ? (
            <div>
              <a
                href="adminstacion del usuario"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white "
              >
                {name}
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                Mis mascotas
              </a>

              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                Cerrar sesion
              </a>
            </div>
          ) : (
            <div>
              <a
                href="formulario de inicio de sesion"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                Iniciar sesion
              </a>
              <a
                href="formulario de inicio de sesion"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                Registrarse
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

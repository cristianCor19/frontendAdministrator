import { useState, useRef, useEffect } from "react";
import { useSession } from "../context/SessionContext";
import { Link } from "react-router-dom";
// Icons
import { RiHome3Line, RiWalletLine, RiPieChartLine } from "react-icons/ri";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { profile, logout } = useSession();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both menu and button
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    // Add event listener only when menu is open
    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  const getDisplayName = () => {
    if (!profile) {
      return "loading....";
    }
    return profile.name && profile.lastname
      ? `${profile.name} ${profile.lastname}`
      : "Usuario";
  };

  return (
    <>
      <div className="navbar-main z-50">
        <div className="navbar-main-margin ">
          <button
            ref={buttonRef}
            onClick={() => setShowMenu(!showMenu)}
            className=" relative top-4 left-8 bottom-4 text-2xl bg-gray-800 p-2 rounded-full text-white z-50"
          >
            {showMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>

          <div className=" text-center -mt-6">
            <Link
              to={"/"}
              className="text-gray-300 rounded-md  items-center  py-0 font-medium  text-4xl"
            >
              Infotect Solutions
            </Link>
          </div>
        </div>
        <div
          ref={menuRef}
          className={`mt-0 test-1 bg-gray-800 h-full fixed  lg:fixed  w-[80%] md:w-[40%] lg:w-[30%] xl:w-[20%] transition-all duration-300 ${
            showMenu ? "left-0" : "-left-full"
          }`}
        >
          {/* Profile */}
          <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
            <img
              src=""
              className="w-20 h-20 object-cover rounded-full ring-2 ring-gray-300"
            />
            <h1 className="text-xl text-white font-bold">{getDisplayName()}</h1>
            <Link className="bg-primary-100 py-2 px-4 rounded-full text-white">
              Ver perfil
            </Link>
          </div>
          
          <div className="bg-gray-700 p-8 rounded-tr-[100px] h-[70vh] flex flex-col justify-between gap-8">
            <nav className="flex flex-col gap-8">
              <Link
                to={"/Home"}
                className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
              >
                <RiHome3Line /> Inicio
              </Link>
              <Link
                to={"/listUsers"}
                className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
              >
                <RiWalletLine /> Usuarios
              </Link>
              <Link
                to={"/listProducts"}
                className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
              >
                <RiPieChartLine /> Lista Productos
              </Link>
              <Link
                to={"/"}
                onClick={() => {
                  logout();
                }}
                className="flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors"
              >
                <RiPieChartLine /> Cerrar sesion
              </Link>
            </nav>
            {/* <div className="bg-primary-900/50 text-white p-4 rounded-xl">
              <p className="text-gray-400">Having troubles?</p>
              <a href="#">Contact us</a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

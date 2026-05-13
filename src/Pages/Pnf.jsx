import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routeContext } from "../contextAPI/RouteGuardContent";

function Pnf() {
  const { role, setRole, authorisedUser, setAuthorisedUser } =
    useContext(routeContext);
  const navigate = useNavigate();

  const backToHome = () => {
    if (role == "user") {
      navigate("/");
    } else {
      navigate("/admin");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <img
        className="w-50"
        src="https://png.pngtree.com/png-clipart/20220109/original/pngtree-404-error-page-not-found-png-image_7021505.png"
        alt=""
      />
      <p>Oh No!</p>
      <h3 className="text-2xl font-medium">Look like you're Lost</h3>
      <p>The page you are looking for is not available</p>
      {authorisedUser ? (
        <button
          onClick={backToHome}
          className="bg-black mt-5 px-3 py-2 text-white"
        >
          Home
        </button>
      ) : (
        <Link to={"/"} className="bg-black mt-5 px-3 py-2 text-white">
          Home
        </Link>
      )}
    </div>
  );
}

export default Pnf;

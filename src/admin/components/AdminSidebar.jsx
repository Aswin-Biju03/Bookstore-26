import React from "react";
import { FaDatabase } from "react-icons/fa";
import { FaChartSimple, FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";
function AdminSidebar() {
  return (
    <div className="bg-blue-100 md:min-h-screen h-fit py-10">
      <div className="flex flex-col items-center justify-center">
        <img
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}
          className="border border-gray-300 z-52"
          src="https://media.creativemornings.com/uploads/user/avatar/49419/Bechtel_Profile_Square.jpg"
          alt=""
        />
        <h3 className="text-2xl font-bold my-5 text-center">Name</h3>
        <div className="mt-10 flex flex-col justify-center items-center">
          <div className="mt-3">
            <Link to={"/admin"} className="flex items-center">
              <FaChartSimple className="me-2"/> Dashboard
            </Link>
          </div>
          <div className="mt-3">
            <Link to={"/admin/resources"} className="flex items-center">
              {" "}
              <FaDatabase className="me-2"/>
              Collections
            </Link>
          </div>
          <div className="mt-3">
            <Link to={"/admin/settings"} className="flex items-center">
             <FaGear className="me-2"/> Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;

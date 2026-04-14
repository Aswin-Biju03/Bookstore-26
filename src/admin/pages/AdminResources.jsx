import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Footer from "../../Components/Footer";
import AdminSidebar from "../components/AdminSidebar";

function AdminResources() {
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-5 gap-2">
        <div className="col-span-1">
          <AdminSidebar />
        </div>
        <div className="col-span-4 p-10">
          {" "}
          <h1 className="text-2xl font-bold text-center mb-10">
            All Resources
          </h1>
          <div className="flex justify-center items-center my-8 font-medium text-lg">
            <p
              onClick={() => setCurrentTab(1)}
              className={
                currentTab == 1
                  ? "p-4 border-gray-200 border-l border-t border-r rounded cursor-pointer "
                  : "p-4 border-gray-200 border-b rounded cursor-pointer "
              }
            >
              Books
            </p>
            <p
              onClick={() => setCurrentTab(2)}
              className={
                currentTab == 2
                  ? "p-4 border-gray-200 border-l border-t border-r rounded cursor-pointer  "
                  : "p-4 border-gray-200 border-b rounded cursor-pointer "
              }
            >
              Users
            </p>
          </div>
          {currentTab == 1 && (
            <div className="md:grid grid-cols-4 w-full my-5">
              <div className="shadow rounded p-3 m-4 md:my-0">
                <img
                  width={"100%"}
                  height={"300px"}
                  src="https://m.media-amazon.com/images/I/81R2N4PRuUL._AC_UF1000,1000_QL80_.jpg"
                  alt="book"
                />
                <div className="flex flex-col justify-center items-center mt-4">
                  <h2 className="text-blue-700 font-bold text-xl">Author</h2>
                  <h3 className="text-lg">Title</h3>
                  <p className="font-bold text-red-500">price</p>
                  <button className="bg-green-600 p-2 text-white my-2 w-full">
                    Approve
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentTab == 2 && (
            <div className="md:grid grid-cols-3 w-full my-5">
              <div className="rounded bg-gray-200 p-2 m-2">
                <p className="text-red-500 font-bold text-md">ID: </p>
                <div className="flex mt-3 items-center">
                  <img
                    width={"80px"}
                    height={"80x"}
                    style={{ borderRadius: "50%" }}
                    src="https://media.creativemornings.com/uploads/user/avatar/49419/Bechtel_Profile_Square.jpg"
                    alt="book"
                  />
                  <div className="flex flex-col ms-3 w-full">
                    <h4 className="text-blue-400 font-bold text-md">
                      Username
                    </h4>
                    <p className="text-xs">mail</p>
                  </div>
                </div>
              </div>xl
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminResources;

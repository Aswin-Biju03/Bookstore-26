import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Auth({ insideRegister }) {
  const [togglePasswordType, setTogglePasswordType] = useState(false);
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[url(/background.png)] bg-cover bg-center text-white">
      <div className="p-10">
        <h1 className="text-center font-bold text-3xl">BOOK STORE</h1>
        <div
          style={{ width: "400px" }}
          className="bg-black text-white p-5 flex justify-center items-center flex-col my-5 rounded-xl"
        >
          <div
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            className="border mb-5 flex justify-center items-center"
          >
            <FaUser className="text-3xl" />
          </div>
          <h1 className="text-2xl">{insideRegister ? "Register" : "Login"}</h1>
          <form className="my-5 w-full">
            {insideRegister && (
              <input
                className="bg-white p-2 w-full rounded my-3 text-black"
                type="text"
                placeholder="Username"
              />
            )}
            <input
              className="bg-white p-2 w-full rounded my-3 text-black"
              type="text"
              placeholder="Email"
            />
            <div className="flex items-center">
              <input
                className="bg-white p-2 w-full rounded my-3 text-black"
                type={togglePasswordType ? "text" : "password"}
                placeholder="Password"
              />
              {togglePasswordType ? (
                <FaEyeSlash
                  onClick={() => setTogglePasswordType(!togglePasswordType)}
                  style={{ marginLeft: "-30px" }}
                  className="text-gray-500 cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setTogglePasswordType(!togglePasswordType)}
                  style={{ marginLeft: "-30px" }}
                  className="text-gray-500 cursor-pointer"
                />
              )}
            </div>
            <div className="flex justify-between mb-5">
              <p className="text-xs text-orange-300">
                Never Share Your Password With Others
              </p>
              {!insideRegister && (
                <button className="text-xs underline">Forgot Password</button>
              )}
            </div>
            <div className="text-center">
              {insideRegister ? (
                <button className="bg-green-600 p-2 w-full rounded">
                  Register
                </button>
              ) : (
                <button className="bg-green-600 p-2 w-full rounded">
                  Login
                </button>
              )}
            </div>
            {!insideRegister && (
              <div className="my-5 text-center">
                <p>--------------------or --------------------</p>
                <div className="mt-2 flex justify-center items-center w-full">
                  Google Authentication
                </div>
              </div>
            )}
            <div className="mt-5 text-center">
              {insideRegister ? (
                <p className="text-blue-500"> Existing User ?<Link to={"/login"} className="underline ms-5"> Login</Link>{" "}</p>
              ) : (
                <p className="text-blue-500">
                  New User ?<Link to={"/register"} className="underline ms-5"> Register</Link>{" "}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;

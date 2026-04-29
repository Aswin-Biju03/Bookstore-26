import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userUpdateAPI } from "../../services/allAPI";

function Edit() {
  const navigate = useNavigate();
  const [offCanvas, setOffCanvas] = useState(false);
  const [existingPicture, setExistingPicture] = useState("");
  const [preview, setPreview] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    cPassword: "",
    picture: "",
    role: "",
    bio: "",
    id: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [imageFileType, setImageFileType] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUserData({
        ...userData,
        username: user.username,
        role: user.role,
        bio: user.bio,
        id: user._id,
      });
      setExistingPicture(user.picture);
    }
  }, []);

  console.log(userData);
  // console.log(existingPicture);

  const handleFileUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile.type.startsWith("image/")) {
      setUserData({ ...userData, picture: e.target.files[0] });
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setImageFileType(true);
    } else {
      setImageFileType(false);
    }
  };

  const checkPasswordMatch = (data) => {
    setUserData({ ...userData, cPassword: data });
    userData.password == data
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  };

  const resetProfileForm = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUserData({
      ...userData,
      username: user.username,
      role: user.role,
      bio: user.bio,
      id: user._id,
      password: "",
      cPassword: "",
    });
    setExistingPicture(user.picture);
    setPreview("");
    setImageFileType(false);
    setPasswordMatch(true);
  };

  const handleUserUpdate = async () => {
    const { username, password, picture, bio, id, cPassword } = userData;
    if (!username || !password || !cPassword || !bio) {
      toast.info("Please fill the form completely");
    } else if (passwordMatch) {
      const reqBody = new FormData();
      for (let key in userData) {
        if (key != "picture") {
          reqBody.append(key, userData[key]);
        } else {
          preview
            ? reqBody.append("picture", picture)
            : reqBody.append("picture", existingPicture);
        }
      }
      const result = await userUpdateAPI(id, reqBody);
      console.log(result);
      if (result.status == 200) {
        toast.success("User Profile Updated Successfully....");
        setTimeout(() => {
          sessionStorage.clear();
          navigate("/login");
        }, 2000);
      }
    }
  };
  return (
    <div>
      <button
        onClick={() => setOffCanvas(true)}
        className="bg-black text-white p-2 flex items-center rounded hover:bg-white hover:text-black"
      >
        <FaPen className="me-2" />
        Edit
      </button>
      {offCanvas && (
        <div>
          <div className="fixed inset-0 bg-gray-500 w-full h-full"></div>
          <div className="bg-white h-full w-90 z-50 fixed top-0 left-0">
            <div className="bg-black text-white px-3 py-4 flex justify-between text-2xl">
              <h1>Update User Profile</h1>
              <FaX onClick={() => setOffCanvas(false)} />
            </div>
            <div className="flex justify-center items-center flex-col my-5">
              <label htmlFor="userProfile">
                <input
                  type="file"
                  name=""
                  id="userProfile"
                  hidden
                  onChange={(e) => handleFileUpload(e)}
                />
                {existingPicture == "" ? (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    className="border border-gray-300 z-52"
                    src={
                      preview
                        ? preview
                        : "https://media.creativemornings.com/uploads/user/avatar/49419/Bechtel_Profile_Square.jpg"
                    }
                    alt=""
                  />
                ) : existingPicture.startsWith(
                    "https://lh3.googleusercontent.com/",
                  ) ? (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    className="border border-gray-300 z-52"
                    src={preview ? preview : existingPicture}
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    className="border border-gray-300 z-52"
                    src={
                      preview
                        ? preview
                        : `${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`
                    }
                    alt=""
                  />
                )}
                <button
                  className="bg-black text-white px-3 py-2 rounded-3xl z-53 fixed "
                  style={{ marginLeft: "50px", marginTop: "-15px" }}
                >
                  <FaPen />
                </button>
              </label>
              {!imageFileType && (
                <div className="mt-5 text-yellow-500 text-sm">
                  *Only accepts image file
                </div>
              )}
              <div className="mt-10 mb-3 w-full px-5">
                <input
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  type="text"
                  placeholder="Username"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className=" mb-3 w-full px-5">
                <input
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  type="password"
                  placeholder="New Password "
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className=" mb-3 w-full px-5">
                <input
                  value={userData.cPassword}
                  onChange={(e) => checkPasswordMatch(e.target.value)}
                  type="password"
                  placeholder="Confirm Password "
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              {!passwordMatch && (
                <div className="mb-3 text-yellow-500 text-sm">
                  *Password and Confirm password must be same
                </div>
              )}
              <div className="mb-3 w-full px-5">
                <input
                  value={userData.bio}
                  onChange={(e) =>
                    setUserData({ ...userData, bio: e.target.value })
                  }
                  type="text"
                  placeholder="Bio"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex justify-end w-full px-5 mt-5 gap-3">
                <button
                  className="bg-yellow-600 text-white py-2 px-3 rounded"
                  onClick={resetProfileForm}
                >
                  Reset
                </button>
                <button
                  onClick={handleUserUpdate}
                  className="bg-green-600 text-white py-2 px-3 rounded"
                >
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </div>
  );
}

export default Edit;

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../Components/Footer";
import { FaBackward, FaCamera, FaEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getViewBookAPI } from "../../services/allAPI";
import axiosInstance from "../../api/axiosInstance";

function View() {
  const [modal, setModal] = useState(false);
  const [book, setBook] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  // ✅ renamed function
  const fetchBookDetails = async () => {
    try {
      const result = await getViewBookAPI(id); // ✅ pass id

      if (result.status === 200) {
        setBook(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />

      <div className="md:m-10 m-5">
        <div className="border p-5 shadow border-gray-200">
          {book ? (
            <div className="md:grid grid-cols-4 gap-x-10">
              {/* Image */}
              <div className="col-span-1">
                <img src={book.imageURL} alt="book" className="w-full" />
              </div>

              {/* Details */}
              <div className="col-span-3">
                <div className="flex justify-between mt-5 md:mt-0">
                  <h3 className="text-2xl font-bold">{book.title}</h3>
                  <button
                    onClick={() => setModal(true)}
                    className="text-gray-400"
                  >
                    <FaEye />
                  </button>
                </div>

                <h2 className="text-blue-700 font-bold text-xl my-5">
                  {book.author}
                </h2>

                <div className="md:grid grid-cols-3 gap-5 my-10">
                  <p>
                    <b>Publisher:</b> {book.publisher}
                  </p>
                  <p>
                    <b>Language:</b> {book.language}
                  </p>
                  <p>
                    <b>No of Pages:</b> {book.pages}
                  </p>
                  <p>
                    <b>Category:</b> {book.category}
                  </p>
                  <p>
                    <b>ISBN:</b> {book.isbn}
                  </p>
                  <p>
                    <b>Original Price:</b> ₹{book.price}
                  </p>
                  <p>
                    <b>Seller:</b> {book.sellerName}
                  </p>
                </div>

                <div className="md:my-10 my-4">
                  <p className="text-bold text-lg">Abstract:</p>
                  <p>{book.abstract}</p>
                </div>

                <div className="flex justify-end">
                  <Link
                    to={"/books"}
                    className="bg-blue-900 text-white p-2 font-black flex items-center"
                  >
                    <FaBackward className="me-2" />
                    Back
                  </Link>

                  <button className="bg-green-800 text-white p-2 font-black ms-5">
                    Buy ₹{book.price}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-xl">Loading...</p>
          )}
        </div>

        {/* Modal */}
        {modal && book && (
          <div
            className="relative z-10 overflow-y-auto"
            onClick={() => setModal(false)}
          >
            <div className="bg-gray-500/75 fixed inset-0">
              <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white rounded-2xl md:w-250 w-100">
                  <div className="bg-black text-white p-3">
                    <h3>Book Images</h3>
                  </div>

                  <div className="relative p-5">
                    <p className="text-blue-500 flex items-center">
                      <FaCamera className="me-2" />
                      Camera Clicks of Books
                    </p>

                    {book?.uploadImages?.length > 0 ? (
                      book?.uploadImages?.map((filename) => (
                        <div className="md:flex flex-wrap my-4">
                          <img
                            className="md:w-75 w-25 md:me-2 mb-3"
                            src={`${axiosInstance.defaults.baseURL}/uploads/${filename}`}
                            alt="book"
                          />
                        </div>
                      ))
                    ) : (
                      <div>Images are not Available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default View;

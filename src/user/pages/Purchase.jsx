import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUserBoughtBooksAPI } from "../../services/allAPI";
import Header from "../components/Header";
import Footer from "../../Components/Footer";
import axiosInstance from "../../api/axiosInstance";

function Purchase() {
  const [boughtBooks, setBoughtBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoughtBooks();
  }, []);

  const fetchBoughtBooks = async () => {
    try {
      const result = await getAllUserBoughtBooksAPI();
      if (result.status === 200) {
        setBoughtBooks(result.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-xl font-bold">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="p-10 my-5">
        <h1 className="text-3xl font-bold mb-8 text-center">My Purchased Books</h1>

        {boughtBooks.length > 0 ? (
          boughtBooks.map((book) => (
            <div key={book._id} className="p-5 rounded mt-4 bg-gray-100 shadow">
              <div className="md:grid grid-cols-[3fr_1fr] gap-5">
                {/* Details */}
                <div className="px-4">
                  <h1 className="text-2xl font-bold">{book.title}</h1>
                  <h2 className="text-xl text-blue-700 font-semibold my-1">
                    {book.author}
                  </h2>
                  <h3 className="text-lg text-green-600 font-bold my-1">
                    ₹{book.discountPrice}
                  </h3>
                  <p className="text-justify text-gray-600 my-3">
                    {book.abstract}
                  </p>
                  <div className="flex gap-3 mt-3 flex-wrap">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                      {book.category}
                    </span>
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">
                      {book.language}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
                      {book.pages} pages
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      <b>Publisher:</b> {book.publisher}
                    </p>
                    <p className="text-sm text-gray-500">
                      <b>ISBN:</b> {book.isbn}
                    </p>
                  </div>
                  <div className="mt-4">
                    <span className="bg-green-600 text-white px-4 py-1 rounded text-sm font-bold">
                      ✅ Purchased
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className="px-4 mt-4 md:mt-0">
                  <img
                    src={book.imageURL}
                    alt={book.title}
                    className="w-full rounded shadow"
                  />
                  {/* Uploaded Images */}
                  {book.uploadImages?.length > 0 && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {book.uploadImages.map((filename) => (
                        <img
                          key={filename}
                          src={`${axiosInstance.defaults.baseURL}/uploads/${filename}`}
                          alt="book"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col justify-center items-center mt-20">
            <img
              width="160px"
              src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
              alt="no books"
            />
            <p className="text-xl font-bold mt-5">No purchased books yet</p>
            <Link
              to="/books"
              className="mt-5 bg-blue-800 text-white px-5 py-2 rounded"
            >
              Browse Books
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Purchase;
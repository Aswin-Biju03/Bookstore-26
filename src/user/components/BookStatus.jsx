import React, { useState, useEffect } from "react";
import {
  deleteUserUploadBookAPI,
  getAllUserBooksAPI,
} from "../../services/allAPI";

function BookStatus() {
  const [uploadBooks, setUploadBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getUserBooks();
  }, []);

  const getUserBooks = async () => {
    try {
      const result = await getAllUserBooksAPI();

      if (result?.status === 200) {
        setUploadBooks(result.data || []);
      }
    } catch (err) {
      console.log("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeBook = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this book?");
      if (!confirmDelete) return;

      setDeletingId(id);

      const result = await deleteUserUploadBookAPI(id);

      if (result?.status === 200) {
        setUploadBooks((prev) =>
          prev.filter((book) => book._id !== id)
        );
      }
    } catch (err) {
      console.log("Delete Error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-10 my-15 shadow rounded">
      {loading ? (
        <div className="text-center font-bold">Loading...</div>
      ) : uploadBooks.length > 0 ? (
        uploadBooks.map((book) => (
          <div key={book._id} className="p-5 rounded mt-4 bg-gray-100">
            <div className="md:grid grid-cols-[3fr_1fr]">

              {/* LEFT */}
              <div className="px-4">
                <h1 className="text-2xl font-bold">{book.title}</h1>
                <h1 className="text-xl">{book.author}</h1>
                <h1 className="text-lg text-blue-500">
                  ₹ {book.discountPrice}
                </h1>
                <p className="text-justify">{book.abstract}</p>

                {/* STATUS */}
                <div className="flex mt-3">
                  {book?.status === "pending" && (
                    <img width="120px" src="https://png.pngtree.com/png-vector/20230905/ourmid/pngtree-under-review-reviewing-png-image_9940487.png" alt="pending" />
                  )}
                  {book?.status === "approved" && (
                    <img width="120px" src="https://png.pngtree.com/png-vector/20230604/ourmid/pngtree-approved-stamp-with-green-color-vector-png-image_7120039.png" alt="approved" />
                  )}
                  {book?.status === "sold" && (
                    <img width="120px" src="https://png.pngtree.com/png-vector/20241113/ourmid/pngtree-circle-sold-red-stamp-with-texture-vector-png-image_14271329.png" alt="sold" />
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="px-4 mt-4 md:mt-0">
                <img
                  src={
                    book.imageURL ||
                    (book.uploadImages && book.uploadImages[0]) ||
                    "https://via.placeholder.com/150"
                  }
                  alt="book"
                  className="w-full h-60 object-cover rounded"
                />

                {/* DELETE BUTTON */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => removeBook(book._id)}
                    disabled={deletingId === book._id}
                    className={`px-4 py-2 rounded text-white ${
                      deletingId === book._id
                        ? "bg-gray-400"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {deletingId === book._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))
      ) : (
        <div className="text-center font-bold">
          You haven't uploaded any book
        </div>
      )}
    </div>
  );
}

export default BookStatus;
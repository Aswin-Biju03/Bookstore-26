import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { addBookAPI } from "../../services/allAPI";

function UploadBook() {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    pages: "",
    imageURL: "",
    price: "",
    discountPrice: "",
    abstract: "",
    publisher: "",
    isbn: "",
    language: "",
    category: "",
    uploadImages: [],
  });
  const [preview, setPreview] = useState("");
  const [previewList, setPreviewList] = useState([]);

  console.log(bookDetails);

  const handleUploadBookImage = (e) => {
    const imageFile = e.target.files[0];
    const uploadBookImageArray = bookDetails.uploadImages;
    uploadBookImageArray.push(imageFile);
    setBookDetails({ ...bookDetails, uploadImages: uploadBookImageArray });
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    const demoPreviewList = previewList;
    demoPreviewList.push(url);
    setPreviewList(demoPreviewList);
  };

  const resetForm = () => {
    setBookDetails({
      title: "",
      author: "",
      pages: "",
      imageURL: "",
      price: "",
      discountPrice: "",
      abstract: "",
      publisher: "",
      isbn: "",
      language: "",
      category: "",
      uploadImages: [],
    });
    setPreview("");
    setPreviewList([]);
  };

  const handleAddBook = async () => {
    const {
      title,
      author,
      pages,
      imageURL,
      price,
      discountPrice,
      abstract,
      publisher,
      isbn,
      language,
      category,
      uploadImages,
    } = bookDetails;
    if (
      !title ||
      !author ||
      !imageURL ||
      !pages ||
      !price ||
      !discountPrice ||
      !abstract ||
      !publisher ||
      !isbn ||
      !language ||
      !category ||
      uploadImages.length == 0
    ) {
      toast.info("Please fill the form completely");
    } else {
      const reqBody = new FormData();
      for (let key in bookDetails) {
        if (key != uploadImages) {
          reqBody.append(key, bookDetails[key]);
        } else {
          bookDetails.uploadImages.forEach((imageFile) => {
            reqBody.append("uploadImages", imageFile);
          });
        }
      }
      const result = await addBookAPI(reqBody);
      console.log(result);
      if (result.status == 201) {
        toast.success("Book Added Successfully");
      } else {
        toast.warning(result.response);
      }
      resetForm();
    }
  };

  return (
    <div className="p-10 my-20 mx-5 bg-gray-200">
      <h1 className="text-center font-bold text-3xl">Upload Book Details</h1>
      <div className="md:grid grid-cols-2 mt-10 w-full">
        <div className="px-3">
          <div className="mb-3">
            <input
              value={bookDetails.title}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, title: e.target.value })
              }
              type="text"
              placeholder="Book Title"
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              value={bookDetails.author}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, author: e.target.value })
              }
              type="text"
              placeholder="Author"
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              value={bookDetails.imageURL}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, imageURL: e.target.value })
              }
              type="text"
              placeholder="Book Cover Image Url"
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              value={bookDetails.pages}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, pages: e.target.value })
              }
              type="text"
              placeholder="Total Pages"
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              value={bookDetails.price}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, price: e.target.value })
              }
              type="text"
              placeholder="Original Price"
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              value={bookDetails.discountPrice}
              onChange={(e) =>
                setBookDetails({
                  ...bookDetails,
                  discountPrice: e.target.value,
                })
              }
              type="text"
              placeholder="Discount Price"
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
          <div className="mb-3">
            <textarea
              value={bookDetails.abstract}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, abstract: e.target.value })
              }
              placeholder="Abstract"
              rows={"5"}
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
        </div>
        <div className="px-3">
          <div className="mb-3">
            <input
              value={bookDetails.publisher}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, publisher: e.target.value })
              }
              type="text"
              placeholder="Publisher"
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              value={bookDetails.language}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, language: e.target.value })
              }
              type="text"
              placeholder="Language"
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              value={bookDetails.isbn}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, isbn: e.target.value })
              }
              type="text"
              placeholder="ISBN"
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
          <div className="mb-3">
            <input
              value={bookDetails.category}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, category: e.target.value })
              }
              type="text"
              placeholder="Category"
              className="w-full border border-gray-300 rounded p-2 bg-white"
            />
          </div>
          <div className="mb-3 flex justify-center items-center mt-10">
            <label htmlFor="bookImages">
              <input
                hidden
                type="file"
                id="bookImages"
                onChange={(e) => handleUploadBookImage(e)}
              />
              <img
                width={"200px"}
                height={"200px"}
                src={
                  preview
                    ? preview
                    : "https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Image-Free-PNG.png"
                }
                alt=""
              />
            </label>
          </div>
          {preview && (
            <div className="flex justify-center items-center mt-10">
              {previewList?.map((imageURL, index) => (
                <img
                  key={`${imageURL}-${index}`}
                  width={"70px"}
                  height={"70px"}
                  src={imageURL}
                  alt="book"
                />
              ))}
              {previewList.length < 3 && (
                <label htmlFor="bookUpload">
                  <input
                    onChange={(e) => handleUploadBookImage(e)}
                    hidden
                    type="file"
                    id="bookUpload"
                  />
                  <FaPlus className="text-3xl ms-2" />
                </label>
              )}
            </div>
          )}
          <div className="flex md:justify-end justify-center w-full px-5 mt-5 gap-3">
            <button
              onClick={resetForm}
              className="bg-gray-600 text-white py-2 px-3 rounded hover:text-gray-600 hover:bg-white"
            >
              Reset
            </button>
            <button
              onClick={handleAddBook}
              className="bg-blue-600 text-white py-2 px-3 rounded hover:text-blue-600 hover:bg-white"
            >
              ADD BOOK DETAILS
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </div>
  );
}

export default UploadBook;

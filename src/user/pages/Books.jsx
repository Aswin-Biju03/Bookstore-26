import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../../Components/Footer";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllBooksAPI } from "../../services/allAPI";

function Books() {
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [dummyAllBooks, setDummyAllBooks] = useState([]);

  // console.log(categoryList);

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
      getBooks();
    }
  }, []);

  const getBooks = async () => {
    const result = await getAllBooksAPI();
    console.log(result);

    if (result.status == 200) {
      setAllBooks(result.data);
      setDummyAllBooks(result.data);
      const tempCategoryList = result.data.map((item) => item.category);
      console.log(tempCategoryList);
      setCategoryList([...new Set(tempCategoryList)]);
    }
  };

  const filterBooks = (category) => {
    if (category != "all") {
      setAllBooks(dummyAllBooks?.filter((book) => book.category == category));
    } else {
      getBooks();
    }
  };

  return (
    <>
      <Header />

      {token ? (
        <>
          {/* Search Section */}
          <div className="flex flex-col justify-center items-center my-5">
            <h1 className="text-3xl font-bold my-5">All Books</h1>

            <div className="flex my-5">
              <input
                type="text"
                className="p-2 border border-gray-200 w-full md:w-96"
                placeholder="Search by Book Title"
              />
              <button className="p-2 bg-blue-800 text-white">Search</button>
            </div>
          </div>

          {/* Main Section */}
          <div className="md:grid grid-cols-4 p-5 md:px-40 mb-10">
            {/* Filter */}
            <div className="col-span-1">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Filter</h1>
                <button
                  onClick={() => setToggle(!toggle)}
                  className="font-bold text-2xl md:hidden"
                >
                  <FaBars />
                </button>
              </div>

              <div className={toggle ? "block" : "hidden md:block"}>
                <div className="mt-3">
                  <input
                    onClick={() => filterBooks("all")}
                    type="radio"
                    name="filter"
                    id="all"
                  />
                  <label htmlFor="all" className="ms-3">
                    All
                  </label>
                </div>

                {categoryList?.map((category) => (
                  <div key={category} className="mt-3">
                    <input
                      onClick={() => filterBooks(category)}
                      type="radio"
                      name="filter"
                      id={category}
                    />
                    <label htmlFor={category} className="ms-3">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Books */}
            <div className="col-span-3">
              <div className="md:grid grid-cols-4 w-full my-10">
                {allBooks?.length > 0 ? (
                  allBooks?.map((book) => (
                    <div
                      key={book?._id}
                      className="shadow rounded p-3 m-4 md:my-0"
                    >
                      <img
                        width={"100%"}
                        height={"300px"}
                        src={book.imageURL}
                        alt="book"
                      />
                      <div className="flex flex-col justify-center items-center mt-4">
                        <h2 className="text-blue-700 font-bold text-xl">
                          {book?.author}
                        </h2>
                        <h3 className="text-lg">{book?.title}</h3>
                        <Link
                          to={`/books/${book?._id}`}
                          className="bg-blue-800 p-2 text-white mt-2"
                        >
                          View Book
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center my-5 font-bold">
                    Book Not Found !!!
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <img
            width={"160px"}
            src="https://media1.tenor.com/m/dnrRcPVbLMkAAAAC/locked-in-locked-out.gif"
            alt="locked"
          />
          <p className="text-lg font-bold my-15">
            Please{" "}
            <Link to={"/login"} className="text-blue-600">
              login
            </Link>{" "}
            to explore more ....
          </p>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Books;

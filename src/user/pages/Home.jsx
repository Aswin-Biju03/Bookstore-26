  import React, { useEffect, useState } from "react";
  import Header from "../components/Header";
  import Footer from "../../Components/Footer";
  import { FaSearch } from "react-icons/fa";
  import { Link, useNavigate } from "react-router-dom";
  import { getHomePageBooksAPI } from "../../services/allAPI";
  import { ToastContainer, toast } from "react-toastify";

  function Home() {
    const [searchKey, setSearchKey] = useState("");
    const [homeBooks, setHomeBooks] = useState([]);
    const navigate = useNavigate();
    console.log(homeBooks);

    useEffect(() => {
      getHomePageBooks();
    }, []);

    const getHomePageBooks = async () => {
      const result = await getHomePageBooksAPI();
      if (result.status == 200) {
        setHomeBooks(result.data);
      }
    };

    const handleSearch = () => {
      if(!searchKey){
        toast.warning("Please Input Book Title ")
      }else if(!sessionStorage.getItem("token")){
        toast.warning("Please Login")
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }else if(searchKey && sessionStorage.getItem("token")){
        navigate("/books")
      }else{
        toast.error("Something went wrong")
      }
    };
    return (
      <>
        <Header />
        <div
          style={{ height: "600px" }}
          className="flex flex-col justify-center items-center bg-[url(/background.png)] bg-cover text-white"
        >
          <div
            style={{ height: "600px", backgroundColor: "rgba(0,0,0,0.3)" }}
            className="w-full flex flex-col justify-center items-center"
          >
            <h1 className="text-6xl font-bold">Wonderful Gifts</h1>
            <p>Gift your family and friends a book</p>
            <div className="mt-9 flex items-center">
              <input
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                type="text"
                placeholder="Search a book"
                className="bg-white p-2 rounded-3xl w-100 text-black"
              />
              <FaSearch
                onClick={handleSearch}
                className="text-gray-500 cursor-pointer"
                style={{ marginLeft: "-40px" }}
              />
            </div>
          </div>
        </div>
        <section className="md:px-40 my-5 p-5 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold my-3">NEW ARRIVALS</h1>
          <h1 className="text-4xl my-2">Explore Our Latest Collection</h1>
          <div className="md:grid grid-cols-4 w-full my-10">
            {homeBooks.length > 0 ? (
              homeBooks?.map((book) => (
                <div key={book?._id} className="shadow rounded p-3 m-4 md:my-0">
                  <img
                    width={"100%"}
                    height={"300px"}
                    src={book?.imageURL}
                    alt="book"
                  />
                  <div className="flex flex-col justify-center items-center mt-4">
                    <h2 className="text-blue-700 font-bold text-xl">
                      {book?.author}
                    </h2>
                    <h3 className="text-lg">{book.title}</h3>
                    <p className="font-bold text-red-500">
                      {book?.discountPrice}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-bold text-center my-3">Loading.....</p>
            )}
          </div>
          <div className="text-center my-10">
            <Link to={"/books"} className="bg-black text-white font-bold p-3">
              Explore More...
            </Link>
          </div>
        </section>
        <section className="md:grid grid-cols-2 items gap-10 p-5 md:px-40">
          <div className="text-center">
            <h2 className="text-xl font-bold">FEATURED AUTHORS</h2>
            <h3 className="text-xl">Captivates with every word</h3>
            <p className="my-5 text-justify">
              Welcome to the Author Spotlight section of our bookstore website!
              This feature is designed to celebrate writers, showcase their
              creative journeys, and help readers discover the minds behind their
              favorite books.
            </p>
            <p className="text-justify">Our Author Features include:</p>
            <p className="text-justify my-5">
              <span className="font-bold">✨ Author Profiles :</span> Get to know
              each author through detailed profiles that highlight their
              biography, writing style, achievements, and personal inspirations.
            </p>
            <p className="text-justify my-5">
              <span className="font-bold">📖 Published Works :</span> Explore a
              curated list of books written by the author with quick access to
              book details, reviews, and purchase options.
            </p>
            <p className="text-justify my-5">
              <span className="font-bold">🎤 Interviews & Insights :</span>{" "}
              Exclusive interviews, behind-the-scenes stories, and writing tips
              that offer a deeper look into the author’s creative world.
            </p>
          </div>
          <div className="p-5 flex items-center justify-center">
            <img
              style={{ width: "50%" }}
              src=" https://img.freepik.com/free-photo/portrait-beautiful-woman-enjoying-cup-coffee-while-woking_23-2148937756.jpg?semt=ais_rp_progressive&w=740&q=80"
              alt="author"
            />
          </div>
        </section>
        <section className="md:px-40 my-5 p-5 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold my-3">TESTIMONIAL</h1>
          <h1 className="text-4xl my-4">See What Others are Saying</h1>
          <div className="flex flex-col justify-center items-center">
            <img
              width={"200px"}
              height={"200px"}
              src="https://www.photoforid.com/static/images/thumbnail.jpg"
              alt=""
              style={{ borderRadius: "50%" }}
            />
            <h3 className="text-center my-4">David Harbour</h3>
            <p className="text-center">
              This bookstore has completely changed the way I discover new books.
              The recommendations are always spot-on, and the delivery is super
              fast. I love the clean interface and the huge collection! The user
              experience is amazing! Easy navigation, great deals, and beautifully
              organized categories. I appreciate how quickly customer support
              responds too.
            </p>
          </div>
        </section>
        <Footer />
        <ToastContainer position="top-center" theme="colored" autoClose={3000} />
      </>
    );
  }

  export default Home;

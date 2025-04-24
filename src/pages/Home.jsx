import React from "react";
import { Carousel } from "../components/Carousel";
import getData from "../utils/getData";
import { Link } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const slides = [
  "https://cdn.galaxycine.vn/media/2024/7/10/my-boo-2048_1720598615672.jpg",
  "https://cdn.galaxycine.vn/media/2024/8/30/beetlejuice-beetlejuice-ma-sieu-quay-2048_1724988933786.jpg",
  "https://cdn.galaxycine.vn/media/2024/7/15/tham-tu-lung-danh-conan-ngoi-sao-5-canh-1-trieu-do-1_1721026295817.jpg",
  "https://cdn.galaxycine.vn/media/2024/7/19/hijack-1971-3_1721360507270.jpg",
];

const Home = () => {
  const [movies, setMovies] = React.useState([]);

  const fetchData = async () => {
    const result = await getData("movie");
    setMovies(result);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="carousel relative  mx-auto">
        <Carousel autoSlide={true}>
          {slides.map((s) => (
            <img src={s} alt="" className="" />
          ))}
        </Carousel>
      </div>

      <section className="bg-white py-8">
        <div className="container mx-auto max-w-screen-xl px-4">
          <nav className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="text-2xl font-bold tracking-wide text-gray-800 hover:text-gray-600"
            >
              🎬 Galaxy Store
            </Link>

            <div className="flex gap-4 items-center">
              <Link to="/movies" className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z"></path>
                </svg>
                <span className="text-sm text-gray-700 hover:text-blue-200">
                  View all movies
                </span>
              </Link>

              <Link to="/">
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path>
                </svg>
              </Link>
            </div>
          </nav>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {movies &&
              movies.map((movie) => (
                <div key={movie.id}>
                  <Link
                    to={`/movie/${movie.id}`}
                    className="relative group block"
                  >
                    <div className="relative rounded-lg overflow-hidden transition-shadow duration-200 group-hover:shadow-xl w-[270px] h-[405px]">
                      <img
                        src={movie.movie_img}
                        alt={movie.movie_name}
                        className="w-[270px] h-[405px] object-cover"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-[270px] h-[405px]"></div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-3.5 py-3 text-center flex items-center justify-center gap-1 dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]">
                          <ConfirmationNumberIcon style={{ fontSize: 20 }} />
                          <span>Pay Ticket</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 ">
                      <p className="text-sl font-semibold text-gray-800 truncate">
                        {movie.movie_name}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

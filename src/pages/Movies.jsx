import React from "react";
import { Carousel } from "../components/Carousel";
import getData from "../utils/getData";
import { Link } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

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
      <section className="bg-white py-8">
        <div className="container mx-auto max-w-screen-xl px-4">
          <nav className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="text-2xl font-bold tracking-wide text-gray-800 hover:text-gray-600"
            >
              🎬 Galaxy Store
            </Link>
          </nav>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {movies &&
              movies.map((movie) => (
                <div key={movie.id} className="w-[270px] h-[405px]">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="relative group block"
                  >
                    <div className="relative rounded-lg overflow-hidden transition-shadow duration-200 group-hover:shadow-xl">
                      <img
                        src={movie.movie_img}
                        alt={movie.movie_name}
                        className="w-[270px] h-[405px] object-cover"
                      />

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-3.5 py-3 text-center flex items-center justify-center gap-1 dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]">
                          <ConfirmationNumberIcon style={{ fontSize: 20 }} />
                          <span>Pay Ticket</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 ">
                      <p className="text-sm font-semibold text-gray-800 truncate">
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

import React from "react";
import { Carousel } from "../components/Carousel";
import getData from "../utils/getData";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const slides = [
  "https://cdn.galaxycine.vn/media/2024/7/10/my-boo-2048_1720598615672.jpg",
  "https://cdn.galaxycine.vn/media/2024/8/30/beetlejuice-beetlejuice-ma-sieu-quay-2048_1724988933786.jpg",
  "https://cdn.galaxycine.vn/media/2024/7/15/tham-tu-lung-danh-conan-ngoi-sao-5-canh-1-trieu-do-1_1721026295817.jpg",
  "https://cdn.galaxycine.vn/media/2024/7/19/hijack-1971-3_1721360507270.jpg",
];

const Home = () => {
  const [movies, setMovies] = React.useState([]);
  const user = React.useContext(UserContext);

  const fetchData = async () => {
    const result = await getData("movie");
    setMovies(result);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>{`Hello ${user ? user.user_email : "guest"}`}</h2>
      <div class="carousel relative  mx-auto">
        <Carousel autoSlide={true}>
          {slides.map((s) => (
            <img src={s} alt="" className="" />
          ))}
        </Carousel>
      </div>
      <section class="bg-white py-8">
        <div class="container mx-auto max-w-screen-xl flex items-center flex-wrap pt-4 pb-12">
          <nav id="store" class="w-full z-30 top-0 px-6 py-1">
            <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <Link
                to="/"
                class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              >
                Store
              </Link>

              <div class="flex items-center" id="store-nav-content">
                <Link
                  to="/"
                  class="pl-3 inline-block no-underline hover:text-black"
                >
                  <svg
                    class="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z"></path>
                  </svg>
                </Link>

                <Link
                  to="/"
                  class="pl-3 inline-block no-underline hover:text-black"
                >
                  <svg
                    class="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </nav>

          {movies &&
            movies.map((movie) => (
              <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    class="hover:grow hover:shadow-lg h-60 object-contain w-full"
                    src={movie.movie_img}
                    alt=""
                  />
                  <div class="pt-3 flex items-center justify-between">
                    <p class="">{movie.movie_name}</p>
                    {movie.movie_rating} *
                    <svg
                      class="h-6 w-6 fill-current text-gray-500 hover:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z"></path>
                    </svg>
                  </div>
                  <p class="pt-1 text-gray-900">{movie.movie_price} VND</p>
                </Link>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Home;

import React from "react";
import getData from "../utils/getData";
import { useParams, Link } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = React.useState({});
  const [showtimes, setShowtimes] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);

  const fetchData = async () => {
    const [respMovie, respActor, respCategory, respShowtime] =
      await Promise.all([
        getData("movie"),
        getData("actor"),
        getData("category"),
        getData("showtime"),
      ]);

    const data = respMovie.find((m) => m.id === id);
    const actor = respActor.find((m) => m.id === data.actor_id);
    const cate = respCategory.find((m) => m.id === data.category_id);
    const showtimefilter = respShowtime.filter((m) => m.movie_id === id);

    const newData = {
      ...data,
      actor_name: actor?.actor_name || "",
      category_name: cate?.category_name || "",
    };

    console.log("movie_createdAt", movie.movie_createdAt);
    setMovie(newData);
    setShowtimes(showtimefilter);
    setAllMovies(respMovie);
  };

  React.useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <main className="bg-white">
      <div className="relative bg-black flex justify-center w-full h-full">
        <div className="absolute w-full h-full z-[300] bg-[#0003]"></div>
        <div className="relative h-full ">
          {movie && movie.movie_img && (
            <div className="relative">
              <img
                width="1440"
                height="440"
                className="w-[500px] h-full md:h-full lg:h-[550px] object-fill duration-500 ease-in-out group-hover:opacity-100"
                src={movie.movie_img}
                alt="Movie Banner"
              />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-[-100px] pt-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              {movie && movie.movie_img ? (
                <img
                  src={movie.movie_img}
                  alt="Movie Poster"
                  className=" border-white w-[220px] h-[330px] object-cover rounded-xl border shadow-md"
                />
              ) : (
                <div className="w-[220px] h-[320px] bg-gray-300 rounded-xl animate-pulse" />
              )}
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {movie.movie_name}
              </h1>
              <p className="text-md text-gray-600 mt-2">
                **: {movie.movie_duration} Minutes
              </p>
              <p className="text-md text-gray-600 mt-2">
                ++: {String(movie.movie_createdAt).split(" ")[0]}
              </p>
              <p className="text-md text-gray-600 mt-2">
                Category: {movie.category_name}
              </p>
              <p className="text-lg mt-2 text-gray-700 font-semibold">
                Actor: {movie.actor_name}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-l font-bold mb-4 border-l-4 border-sky-500 pl-2">
              Nội Dung Phim
            </h2>
            <div className=" rounded-md p-4 ">
              <p className="text-base mb-2">{movie.movie_content}</p>
            </div>
          </div>
          <div className="">
            <h2 className="text-l font-bold mb-4 border-l-4 border-sky-500 pl-2">
              Showtime
            </h2>
            <div className=" rounded-md p-4 ">
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                Galaxy Trường Chinh - 2D Vietsub
              </h3>
              <div className="flex flex-wrap gap-3">
                {showtimes.map((st) => (
                  <Link key={st.id} to={`/movie/${id}/showtime/${st.id}/order`}>
                    <button className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-sky-500 hover:text-white transition duration-300 text-sm font-medium">
                      {st.showtime_timedate.split(" ")[1]}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải - Tất cả phim khác */}
        <div className="lg:col-span-1 space-y-6 mt-[90px]">
          <div className="flex items-center mb-2">
            <span className="border-l-4 border-sky-500 mr-2 h-6"></span>
            <h1 className="text-l font-bold">TẤT CẢ PHIM</h1>
          </div>

          <div className="flex flex-col gap-4">
            {allMovies.map((mv) => (
              <Link key={mv.id} to={`/movie/${mv.id}`} className="block group">
                <img
                  src={mv.movie_img}
                  alt={mv.movie_name}
                  className="w-[350px] h-[180px] object-cover rounded-md hover:scale-105 transition-transform duration-300 shadow"
                />
                <p className="text-sm mt-2 group-hover:text-sky-500 font-medium text-left">
                  {mv.movie_name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetail;

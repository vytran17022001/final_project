import React from "react";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import getData from "../utils/getData";
import { useParams, Link } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = React.useState({});
  const [showtimes, setShowtimes] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const [respMovie, respDirec, respActor, respCategory, respShowtime] =
      await Promise.all([
        getData("movie"),
        getData("direction"),
        getData("actor"),
        getData("category"),
        getData("showtime"),
      ]);

    const data = respMovie.find((m) => m.id === id);
    const direc = respDirec.find((m) => m.id === data.direction_id);
    const actor = respActor.find((m) => m.id === data.actor_id);
    const cate = respCategory.find((m) => m.id === data.category_id);
    const showtimefilter = respShowtime.filter((m) => m.movie_id === id);

    const newData = {
      ...data,
      direction_name: direc?.direction_name || "",
      actor_name: actor?.actor_name || "",
      category_name: cate?.category_name || "",
    };

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

            <div className="flex flex-col justify-end ">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {movie.movie_name}
              </h1>
              <div className="flex items-center gap-6 mt-2 text-md text-gray-600">
                <div className="flex items-center gap-1">
                  <AccessAlarmsIcon sx={{ color: "#f97316", fontSize: 20 }} />
                  <span>{movie.movie_duration} Minutes</span>
                </div>

                <div className="flex items-center gap-1">
                  <CalendarTodayIcon sx={{ color: "#f97316", fontSize: 20 }} />
                  <span>
                    {new Date(movie.movie_createdAt).toLocaleDateString(
                      "vi-VN"
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <StarIcon sx={{ color: "#f97316", fontSize: 28 }} />
                <h1 className="text-xl md:text-2xl  text-gray-900">
                  {movie.movie_rating}
                </h1>
              </div>
              <div className="flex flex-nowrap items-center text-sm">
                <span className="inline-block h-8 py-[6px] text-grey-40 flex-0">
                  Country:{" "}
                </span>
                <p className="ml-2 flex flex-wrap gap-1 flex-1">
                  {movie.movie_country}
                </p>
              </div>
              <div className="flex flex-nowrap items-center text-sm">
                <span className="inline-block h-8 py-[6px] text-grey-40 flex-0">
                  Category:{" "}
                </span>
                <p className="ml-2 flex flex-wrap gap-1 flex-1">
                  {movie.category_name}
                </p>
              </div>
              <div className="flex flex-nowrap items-center text-sm">
                <span className="inline-block h-8 py-[6px] text-grey-40 flex-0">
                  Direction:{" "}
                </span>
                <p className="ml-2 flex flex-wrap gap-1 flex-1">
                  {movie.direction_name}
                </p>
              </div>
              <div className="flex flex-nowrap items-center text-sm">
                <span className="inline-block h-8 py-[6px] text-grey-40 flex-0">
                  Actor:{" "}
                </span>
                <p className="ml-2 flex flex-wrap gap-1 flex-1">
                  {movie.actor_name}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-l font-bold mb-4 border-l-4 border-sky-500 pl-2">
              Movie Content
            </h2>
            <div className="rounded-md p-4">
              <p className="text-base -mt-3">{movie.movie_content}</p>
            </div>
          </div>

          <div className="mt-2">
            <h2 className="text-l font-bold mb-4 border-l-4 border-sky-500 pl-2">
              Showtime
            </h2>
            <div className="rounded-md p-4 ">
              <h3 className="text-base font-semibold text-gray-800 mb-2 -mt-5">
                Galaxy Trường Chinh - 2D Vietsub
              </h3>
              <div className="flex flex-wrap gap-3">
                {showtimes.map((st) => (
                  <Link key={st.id} to={`/movie/${id}/showtime/${st.id}/order`}>
                    <button className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-sky-500 hover:text-white transition duration-300 text-sm font-medium">
                      {st.showtime_timedate.split(" ")[1]}{" "}
                      {st.showtime_timedate.split(" ")[2]}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div className="lg:col-span-1 space-y-6 mt-[90px]">
          <div className="flex items-center mb-2">
            <span className="border-l-4 border-sky-500 mr-2 h-6"></span>
            <h1 className="text-l font-bold">TẤT CẢ PHIM</h1>
          </div>

          <div className="flex flex-col gap-4">
            {allMovies.slice(0, 3).map((mv) => (
              <Link key={mv.id} to={`/movie/${mv.id}`} className="block group">
                <div className="relative rounded-lg overflow-hidden transition-shadow duration-200 group-hover:shadow-xl">
                  <img
                    src={mv.movie_img}
                    alt={mv.movie_name}
                    className="w-full h-[200px] object-contain rounded-md hover:scale-105 transition-transform duration-300 shadow bg-gradient-to-b from-white to-slate-100"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white bg-[#f26b38] w-[90px] h-[30px] hover:bg-[#fb9440] rounded text-[10px] px-3 py-3 text-center flex items-center justify-center gap-1 dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]">
                      <ConfirmationNumberIcon style={{ fontSize: 12 }} />
                      <span>Pay Ticket</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm mt-2 font-medium text-left">
                  {mv.movie_name}
                </p>
              </Link>
            ))}

            <div className="text-right mt-2">
              <button
                onClick={() => navigate("/movies")}
                className="px-4 py-1.5 rounded border border-[#f26b38] text-[#f26b38] hover:bg-[#f26b38] hover:text-white transition "
              >
                <span>See more</span>
                <NavigateNextIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetail;

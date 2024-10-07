import React from "react";
import getData from "../utils/getData";
import { useParams, Link } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = React.useState({});
  const [showtimes, setShowtimes] = React.useState([]);

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

    let newData = {
      ...data,
      actor_name: actor.actor_name,
      category_name: cate.category_name,
    };

    setMovie(newData);
    setShowtimes(showtimefilter);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="bg-white">
      <div class="grid grid-cols-3 gap-6 mx-auto max-w-screen-xl py-7 px-4 pb-6 pt-16 sm:px-6 lg:px-5 lg:pt-8">
        <div className="col-span-2">
          <section class="">
            <div class=" max-w-screen-xl mx-auto px-4">
              <div class="text-center">
                <div class="flex justify-center">
                  {movie && movie.movie_img ? (
                    <img
                      src={movie.movie_img}
                      alt="Movie poster"
                      className="lg:h-[400px]"
                    />
                  ) : (
                    <div class="rounded-md p-4 max-w-sm w-full mx-auto">
                      <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-6 py-1">
                          <div class="h-[400px] bg-slate-200 rounded py-1"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <h1 class="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-black-10 mr-4">
                  {movie.movie_name}
                </h1>

                <h6 class=" text-[20px] md:text-[24px] lg:text-[28px] font-bold text-black-10 mr-4">
                  {movie.actor_name}
                </h6>

                <p class="font-normal text-gray-600 text-md md:text-xl mb-16">
                  {movie.category_name}
                </p>
              </div>
            </div>
          </section>
          <div className="movie__showtime">
            <div className="movie__showtime-header">
              <span class="border-l-4 border-solid border-sky-500 mr-2"></span>
              <h1 class="mb-4 text-base inline-block capitalize font-bold">
                Show Times
              </h1>
            </div>
            <div className="movie__filter grid  grid-cols-1 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-12 items-center"></div>
          </div>
          <div class="line w-full h-0.5 bg-sky-500"></div>
          <div className="showtime__list">
            <div className="showtime__cinema md:py-8 py-4 px-3 odd:bg-white even:bg-[#FDFBFA] even:border-t even:border-b">
              <h1 class="text-base font-bold mb-4">Galaxy Trường Chinh</h1>
              <div className="showtime__bundle flex md:flex-row flex-col gap-2 items-start mb-6">
                <label class="text-sm font-semibold text-grey-10 mt-2 w-[150px]">
                  2D Phụ Đề
                </label>
                <div class="time__show flex flex-1 flex-row gap-x-3 gap-y-1 flex-wrap">
                  {showtimes &&
                    showtimes.map((st) => {
                      return (
                        <Link to={`/movie/${id}/showtime/${st.id}/order`}>
                          <button class="py-2 md:px-8 px-6 border rounded text-sm font-normal text-black-10 hover:bg-blue-500 active:bg-blue-500  transition-all duration-500 ease-in-out hover:text-white">
                            {st.showtime_timedate.split(" ")[1]}
                          </button>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" block break-words">
          hiádaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
      </div>
    </main>
  );
};

export default MovieDetail;

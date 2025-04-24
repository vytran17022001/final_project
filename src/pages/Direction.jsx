import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import getData from "../utils/getData";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

export const Direction = () => {
  const [diretions, setDirections] = useState([]);
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const result = await getData("direction");
    const respMovie = await getData("movie");
    setDirections(result);
    setMovies(respMovie);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <main className="bg-white">
        <div className="grid grid-cols-3 gap-6 mx-auto max-w-screen-xl py-7 px-4  sm:px-6 lg:px-5 lg:pt-8 ">
          <div className="col-span-2">
            <div className="border-b-2 border-blue-10">
              <span className="border-l-4 border-solid border-blue-400 mr-2"></span>
              <h1 className="mb-3 text-xl inline-block uppercase font-medium">
                Direction
              </h1>
            </div>
            <div className="max-h-[710px] overflow-y-auto pr-2">
              {diretions &&
                diretions.map((direc) => (
                  <div className="my-8">
                    <ul className="post_list">
                      <li className="mb-2">
                        <section className="post_item flex justify-start gap-4">
                          <Link to="" className="md:w-[255px] w-auto">
                            <img
                              alt="Chris Evans"
                              loading="lazy"
                              width="255"
                              height="170"
                              decoding="async"
                              data-nimg="1"
                              className='rounded w-[109px] h-[79px] md:w-[255px] md:h-[170px] object-cover duration-500 ease-in-out group-hover:opacity-100" scale-100 blur-0 grayscale-0)'
                              src={direc.direction_img}
                              sx={{ color: "transparent" }}
                            />
                          </Link>
                          <div className="flex-1">
                            <Link
                              to=""
                              className="text-black-10 text-sm md:text-[#333] md:text-lg font-semibold md:font-semibold not-italic transition-all duration-500 ease-in-out item__title"
                            >
                              {direc.direction_name}
                            </Link>
                            <div className="post__description">
                              <button className="bg-blue-500 hover:bg-blue-700 text-white focus:ring-10 focus:ring-blue-300 text-xs mr-2 py-1 px-5 rounded">
                                <ThumbUpOffAltIcon
                                  className=""
                                  sx={{
                                    fontSize: "0.90rem",
                                    lineHeight: "1rem" /* 16px */,
                                    marginBottom: "0.18rem",
                                  }}
                                />{" "}
                                like
                              </button>
                              <button className="text-xs bg-gray-200  mr-2 py-1 px-5 rounded">
                                <RemoveRedEyeIcon
                                  className=""
                                  sx={{
                                    fontSize: "0.90rem",
                                    lineHeight: "1rem",
                                    marginBottom: "0.18rem",
                                  }}
                                />{" "}
                                147818
                              </button>
                              <div className=" text-gray-400 text-sm font-normal-important not-italic leading-6 mt-2 hidden md:block description__short__detail">
                                <p className="text-justify">
                                  {direc.direction_description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </section>
                      </li>
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          <div className="lg:col-span-1 mt-3">
            <div className="flex items-center mb-2">
              <span className="border-l-4 border-sky-500 mr-2 h-6"></span>
              <h1 className="text-l font-bold">TẤT CẢ PHIM</h1>
            </div>

            <div className="flex flex-col gap-4">
              {movies.slice(0, 3).map((mv) => (
                <Link
                  key={mv.id}
                  to={`/movie/${mv.id}`}
                  className="block group"
                >
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
    </>
  );
};

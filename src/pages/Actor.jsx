import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import getData from "../utils/getData";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const Actor = () => {
  const [actors, setActors] = useState([]);
  const fetchData = async () => {
    const result = await getData("actor");
    setActors(result);
    console.log(result);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <main className="bg-white">
        <div class="grid grid-cols-3 gap-6 mx-auto max-w-screen-xl py-7 px-4 pb-6 pt-16 sm:px-6 lg:px-5 lg:pt-8 mt-16">
          <div className="col-span-2">
            <div class="border-b-2 border-blue-10">
              <span class="border-l-4 border-solid border-blue-400 mr-2"></span>
              <h1 class="mb-4 text-xl inline-block uppercase font-medium">
                Actor
              </h1>

              <div class="bg-[#343a40] opacity-60 fixed top-0 right-0 bottom-0 z-[1000] overflow-y-scroll left-0 w-full h-full transition-all duration-500 ease-in-out hidden screen1200:hidden"></div>
              <nav class="fixed pr-4 md:px-11 z-[1030] block w-[287px] md:w-[346px] h-[100vh] top-0 bg-white transition-all duration-500 ease-in-out p-4 overflow-auto translate-x-[100px] -right-[500px] screen1200:hidden">
                <div class="flex justify-end">
                  <button>
                    <span></span>
                  </button>
                </div>
                <div class="flex flex-col justify-between gap-1 lg:gap-5 py-6">
                  <div>
                    <div
                      aria-label="Dropdown select"
                      aria-expanded="false"
                      tabindex="0"
                      direction="ltr"
                      class="react-dropdown-select text-sm css-8xupl1 e1gzf2xs0"
                      color="#0074D9"
                    >
                      <div class="react-dropdown-select-content react-dropdown-select-type-single css-1m5113o e1gn6jc30">
                        <span>Quốc gia</span>
                        <input
                          tabindex="-1"
                          class="react-dropdown-select-input css-1q95dnp e11wid6y0"
                          readonly=""
                          placeholder=""
                          value=""
                        />
                      </div>
                      <div
                        tabindex="-1"
                        class="react-dropdown-select-dropdown-handle css-ago8sv e1vudypg0"
                        rotate="1"
                        color="#0074D9"
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div
                      aria-label="Dropdown select"
                      aria-expanded="false"
                      tabindex="0"
                      direction="ltr"
                      class="react-dropdown-select text-sm css-8xupl1 e1gzf2xs0"
                      color="#0074D9"
                    >
                      <div class="react-dropdown-select-content react-dropdown-select-type-single css-1m5113o e1gn6jc30">
                        <span>Xem nhiều nhất</span>
                        <input
                          tabindex="-1"
                          class="react-dropdown-select-input css-1q95dnp e11wid6y0"
                          readonly=""
                          placeholder=""
                          value=""
                        />
                      </div>
                      <div
                        tabindex="-1"
                        class="react-dropdown-select-dropdown-handle css-ago8sv e1vudypg0"
                        rotate="1"
                        color="#0074D9"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="flex gap-3 md:hidden py-6">
                  <div class="flex-1">
                    <button
                      type="button"
                      class="text-[#fff] hover:text-white w-full h-10 border bg-[#fb9440] hover:bg-[#fb9440] transition-all duration-300 focus:ring-1 focus:outline-none focus:ring-[#fb9440] rounded text-sm text-center not-italic"
                    >
                      Áp Dụng
                    </button>
                  </div>
                  <div class="block flex-2">
                    <button class="block text-center w-full px-3 border border-red-500 rounded bg-white h-10 font-semibold text-xs not-italic text-red-500 transition-all duration-300 focus:outline-none focus:bg-transparent">
                      {" "}
                      Xoá bộ lọc
                    </button>
                  </div>
                </div>
              </nav>
            </div>
            {actors &&
              actors.map((actors) => (
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
                            class='rounded w-[109px] h-[79px] md:w-[255px] md:h-[170px] object-cover duration-500 ease-in-out group-hover:opacity-100"
      scale-100 blur-0 grayscale-0)'
                            src={actors.actor_img}
                            sx={{ color: "transparent" }}
                          />
                        </Link>
                        <div className="flex-1">
                          <Link
                            to=""
                            className="text-black-10 text-sm md:text-[#333] md:text-lg font-semibold md:font-semibold not-italic transition-all duration-500 ease-in-out item__title"
                          >
                            {actors.actor_name}
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
                                  lineHeight: "1rem" /* 16px */,
                                  marginBottom: "0.18rem",
                                }}
                              />{" "}
                              147818
                            </button>
                            <div className=" wysiwyg text-gray-400 text-sm font-normal-important not-italic leading-6 mt-2 hidden md:block description__short__detail">
                              <p className="text-justify">
                                {actors.actor_description}
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
          <div className=" block break-words">
            hiádaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </div>
        </div>
      </main>
    </>
  );
};

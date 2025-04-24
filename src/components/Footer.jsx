import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../logo1.svg";
const logoStyle = {
  width: "170px",
  height: "100px",
  cursor: "pointer",
  marginBottom: "2px",
  marginLeft: "7px",
  backgroundColor: "transparent",
};

const Footer = () => {
  return (
    <footer className="bg-stone-200  mt-6">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-5 lg:pt-8 ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link to="/">
              <img src={logo} style={logoStyle} alt="logo of cinema ticket" />
            </Link>

            <p className="mt-2 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              consequuntur amet culpa cum itaque neque.
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              <li>
                <Link
                  to="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-blue-600 "
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
              </li>

              <li>
                <Link to="/" rel="noreferrer" target="_blank">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6 "
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="0 0 48 48"
                  >
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                      cx="19.38"
                      cy="42.035"
                      r="44.899"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#fd5"></stop>
                      <stop offset=".328" stop-color="#ff543f"></stop>
                      <stop offset=".348" stop-color="#fc5245"></stop>
                      <stop offset=".504" stop-color="#e64771"></stop>
                      <stop offset=".643" stop-color="#d53e91"></stop>
                      <stop offset=".761" stop-color="#cc39a4"></stop>
                      <stop offset=".841" stop-color="#c837ab"></stop>
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    ></path>
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                      cx="11.786"
                      cy="5.54"
                      r="29.813"
                      gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#4168c9"></stop>
                      <stop
                        offset=".999"
                        stop-color="#4168c9"
                        stop-opacity="0"
                      ></stop>
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                    ></path>
                    <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                    <path
                      fill="#fff"
                      d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                    ></path>
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-red-500"
                >
                  <span className="sr-only">Youtube</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="nonzero"
                      d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                      clipRule="nonzero"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">About Us</p>

              <ul class="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    to="/about"
                    class="text-gray-700 transition hover:text-gray-700/75"
                  >
                    Usage Agreement
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    class="text-gray-700 transition hover:text-gray-700/75"
                  >
                    Operating Regulations
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    class="text-gray-700 transition hover:text-gray-700/75"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">Cinema Corner</p>

              <ul class="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    to="/"
                    class="text-gray-700 transition hover:text-gray-700/75"
                  >
                    Movie genre
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    class="text-gray-700 transition hover:text-gray-700/75"
                  >
                    {" "}
                    Movie Commentary{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    class="text-gray-700 transition hover:text-gray-700/75"
                  >
                    {" "}
                    Cinema Blog{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    class="text-gray-700 transition hover:text-gray-700/75"
                  >
                    {" "}
                    Good Movies of the Month{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    class="text-gray-700 transition hover:text-gray-700/75"
                  >
                    {" "}
                    IMAX Film{" "}
                  </Link>
                </li>
              </ul>
            </div>

            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">Helpful Links</p>

              <ul class="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    to="/"
                    class="text-gray-700 transition hover:text-gray-700/75"
                  >
                    {" "}
                    FAQs{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    class="text-gray-700 transition hover:text-gray-700/75"
                  >
                    {" "}
                    Feedback{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    class="group flex justify-left gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                  >
                    <span class="text-gray-700 transition group-hover:text-gray-700/75">
                      Live Chat
                    </span>

                    <span class="relative flex h-2 w-2">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                      <span class="relative inline-flex size-2 rounded-full bg-blue-400"></span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">Contact Us</p>

              <ul class="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    to="/"
                    class="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span class="flex-1 text-gray-700">Cinema@gmail.com</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    class="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>

                    <span class="flex-1 text-gray-700">0337460582</span>
                  </Link>
                </li>

                <li class="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 shrink-0 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <address class="-mt-0.5 flex-1 not-italic text-gray-700">
                    20 cong hoa, tan binh, TP HCM
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-12 border-t border-gray-100 pt-6">
          <div class="text-center sm:flex sm:justify-between sm:text-left">
            <p class="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; 2025 PureCinema
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

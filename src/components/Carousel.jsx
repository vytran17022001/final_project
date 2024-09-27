import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 5000,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval); // chức năng dọn dẹp để dừng khoảng thời gian khi thành phần được ngắt kết nối
  }, []);

  return (
    <div className="overflow-hidden relative *:">
      <div
        className="flex transition-transform ease-out duration-500 " /*500ms*/
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between m-2">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-gray-200 text-gray-800 hover:bg-white "
        >
          <ChevronLeftIcon fontSize="large" />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-gray-200 text-gray-800 hover:bg-white "
        >
          <ChevronRightIcon fontSize="large" />
        </button>
      </div>

      <div className="absolute bottom-2 left-1/2">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              className={`transtion-all w-2 h-2 bg-white rounded-full ${
                curr === i ? "p-0" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

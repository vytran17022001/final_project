import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        src="https://s3-cdn.cmlabs.co/page/2023/01/24/a-guideline-on-how-to-fix-error-404-not-found-effectively-519451.png"
        alt=""
        className="h-[1000px]"
      />
      <Link to="/">
        <button>Go back home</button>
      </Link>
    </div>
  );
};

export default NotFound;

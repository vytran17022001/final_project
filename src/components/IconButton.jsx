import React from "react";

const IconButton = ({ icon, text }) => {
  return (
    <>
      <h1>{text}</h1>
      <img src={icon} alt="" className="w-[20px] h-[20px]" />
    </>
  );
};

export default IconButton;

import React from "react";
import TableComponent from "../../components/TableComponent";

const Direction = () => {
  return (
    <>
      <div className="container mx-auto px-10" style={{ height: "1000px" }}>
        <TableComponent collection="direction" />
      </div>
    </>
  );
};

export default Direction;

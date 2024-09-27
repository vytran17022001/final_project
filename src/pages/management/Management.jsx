import React from "react";
import TableComponent from "../../components/TableComponent";

const Management = () => {
  return (
    <>
      <div className="container mx-auto px-10">
        <TableComponent collection="Dashboard" />
      </div>
    </>
  );
};

export default Management;

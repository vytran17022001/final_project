import React from "react";
import TableComponent from "../components/TableComponent";
import Header from "../components/Header";

const Role = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-10">
        <TableComponent collection="role" />
      </div>
    </>
  );
};

export default Role;

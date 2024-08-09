import React from "react";
import TableComponent from "../../components/TableComponent";

export const Ticket = () => {
  return (
    <>
      <div className="container mx-auto px-10" style={{ height: "1000px" }}>
        <TableComponent collection="ticket" />
      </div>
    </>
  );
};

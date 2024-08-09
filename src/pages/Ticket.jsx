import React, { useEffect } from "react";
import getData from "../utils/getData";
import { useParams, Link } from "react-router-dom";

export const Ticket = () => {
  const [selectedSeat, setSelectedSeat] = React.useState([]);

  const handleSet = (seatId) => {
    console.log("Dang chon ", seatId);
    if (selectedSeat.includes(seatId)) {
      const kophaino = selectedSeat.filter((s) => s !== seatId);
      console.log("Mangg moi: ", kophaino);
      setSelectedSeat(kophaino);
    } else {
      setSelectedSeat([...selectedSeat, seatId]);
    }
  };

  const submitData = () => {
    const collection = "ticket";
    const data = {
      showtime_id: "",
      ticket_chair: selectedSeat,
    };

    // postData(collection, data).then()
  };

  useEffect(() => console.log(selectedSeat), [selectedSeat]);
  return (
    <main className="bg-slate-100 md:pb-0">
      <div className="md:container md:mx-auto max-w-screen-xl xl:max-w-screen-xl lg:max-w-4xl md:max-w-4xl md:px-0 sm:px-[45px]  grid xl:grid-cols-3 grid-cols-1">
        <div className="col-span-2 xl:order-first order-last xl:h-full h-[full] overflow-hidden xl:overflow-auto xl:pb-10 pb-32">
          <div className=" col-span-2">
            <div className="bg-white md:px-6 py-4 px-2 rounded md:mb-8 w-full">
              <div className="screen mb-4">
                <img
                  className="w-full"
                  src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-screen.png"
                  alt=""
                ></img>
              </div>
              <div className=" md:block flex flex-wrap justify-center w-full h-full overflow-auto cursor-pointer">
                {Array.from({ length: 7 }, (_, i) => {
                  i++;
                  return (
                    <div
                      className={`h-full ${
                        selectedSeat.includes(i) ? "bg-green-100" : "bg-red-100"
                      }`}
                      onClick={() => {
                        handleSet(i);
                      }}
                    >
                      A{i}
                    </div>
                  );
                })}
              </div>
              <div className="seat__layout-screen">
                <div className="text-sm flex md:flex-row flex-col-reverse justify-between items-center py-9 gap-2">
                  <div className="flex gap-5">
                    <div>
                      <span className="w-5 h-5 rounded bg-gray-200 inline-block align-middle"></span>
                      <span className="ml-2">Chair Sold</span>
                    </div>
                    <div>
                      <span className="w-5 h-5 rounded bg-orange-400 inline-block align-middle"></span>
                      <span className="ml-2">Chair is being chosen</span>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div>
                      <span className="w-5 h-5 rounded border border-yellow-400 inline-block align-middle"></span>
                      <span className="ml-2">VIP Chair</span>
                    </div>
                    <div>
                      <span className="w-5 h-5 rounded border border-gray-400 inline-block align-middle"></span>
                      <span className="ml-2">Single Chair</span>
                    </div>
                    <div>
                      <span className="w-[46px] h-5 rounded border border-blue-300 inline-block align-middle"></span>
                      <span className="ml-2">Double chair</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-1 xl:pl-4 xl:order-none order-first py-4">
          <p>kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p>
        </div>
      </div>
    </main>
  );
};

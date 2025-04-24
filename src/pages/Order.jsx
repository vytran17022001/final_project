import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import getData from "../utils/getData";
import { PaymentForm } from "../components/PaymentForm";

export const Order = () => {
  const { showtimeId } = useParams();
  const [selectedSeat, setSelectedSeat] = React.useState([]);
  const [boughtSeat, setBoughtSeat] = React.useState([]);

  const handleSet = (seatId) => {
    if (boughtSeat.includes(seatId)) {
      // alert("Ghe da dc mua");
      return;
    }
    if (selectedSeat.includes(seatId)) {
      const kophaino = selectedSeat.filter((s) => s !== seatId);
      setSelectedSeat(kophaino);
    } else {
      setSelectedSeat([...selectedSeat, seatId]);
    }
  };

  useEffect(() => {
    getData("order").then((data) => {
      const boughtSeat = data.filter(
        (order) => order.showtime_id === showtimeId
      );
      const re = boughtSeat.map((order) => {
        return order.order_chair;
      });
      // boughtSeat = [C5, E5, B10, B11]
      setBoughtSeat(re.flat());
    });
  }, []);

  const SeatComponent = ({ name, quantity, isDouble }) => {
    return (
      <div className="relative my-4 w-max pl-6 pr-6">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-semibold w-4 text-center">
          {name}
        </span>

        <div className="flex gap-2">
          {Array.from({ length: quantity }, (_, i) => {
            i++;
            const seatId = `${name}${i}`;
            const isSelected = selectedSeat.includes(seatId);
            const isBought = boughtSeat.includes(seatId);

            return (
              <button
                key={seatId}
                onClick={() => handleSet(seatId)}
                className={`flex items-center justify-center text-xs md:text-sm rounded 
              ${isDouble ? "w-12 h-6" : "w-6 h-6"} 
              border 
              ${
                isBought
                  ? "bg-gray-300 border-gray-300 cursor-not-allowed"
                  : isSelected
                  ? "bg-orange-500 text-white "
                  : "bg-white border-gray-300 hover:bg-orange-500"
              }
            `}
              >
                {isDouble ? `${i} ${i}` : i}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="bg-slate-100 py-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="relative border-t-4 border-red-500 rounded-full text-center text-sm py-2 mb-10">
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-gray-500 font-semibold">
                Screen
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex flex-col gap-3 items-start">
                <SeatComponent name="A" quantity={13} />
                <SeatComponent name="B" quantity={10} />
                <SeatComponent name="C" quantity={14} />
                <SeatComponent name="D" quantity={8} />
                <SeatComponent name="E" quantity={12} />
                <SeatComponent name="F" quantity={8} isDouble={true} />
              </div>
            </div>
            <div className="mt-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-gray-300 inline-block"></span>
                  <span>Chair Sold</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-orange-500 inline-block"></span>
                  <span>Being chosen</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded border border-gray-400 inline-block"></span>
                  <span>Single Chair</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                  <span className="w-12 h-6 rounded border border-blue-400 inline-block"></span>
                  <span>Double Chair</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:block">
          <PaymentForm selectedSeat={selectedSeat} />
        </div>
      </div>
    </main>
  );
};

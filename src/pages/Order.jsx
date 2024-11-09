import React, { useEffect } from "react";
import postData from "../utils/postData";
import { useNavigate, useParams } from "react-router-dom";
import getData from "../utils/getData";
import { AuthContext } from "../context/AuthProvider";

export const Order = () => {
  const { showtimeId } = useParams();
  const [selectedSeat, setSelectedSeat] = React.useState([]);
  const [boughtSeat, setBoughtSeat] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

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

  const handlePay = async (e) => {
    if (selectedSeat.length === 0) return alert("Please select seat");
    if (!user) {
      // context
      alert("Please login");
      const oldUrl = document.location.pathname;
      return navigate(`/login?oldUrl=${oldUrl}`); // useNavigate
    }
    // if (selectedSeat.length === 0) alert("Please select seat");

    await postData("order", {
      order_createdAt: new Date(),
      order_isPaid: false,
      showtime_id: showtimeId,
      user_id: user.id,
      order_chair: selectedSeat,
    })
      .then(() => alert("Da mua thanh cong"))
      .catch((err) => alert("That bai"));
  };

  React.useEffect(() => {
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
      <div className="relative flex gap-10 flex-nowrap my-4 w-fit">
        <span className="absolute -left-10 top-1/2 -translate-y-1/2 text-sm text-grey-40 font-semibold flex-none  w-5 ">
          {name}
        </span>
        {Array.from({ length: quantity }, (_, i) => {
          i++;
          return isDouble ? (
            <button
              className={`md:h-5 h-4 border rounded md:text-s text-[10px] md:w-12 w-8  border-blue-300 ${
                selectedSeat.includes(`${name}${i}`)
                  ? "bg-yellow-300 text-white"
                  : "text-black transition duration-200 ease-in-out hover:bg-yellow-200 hover:border-transparent"
              }
              ${
                boughtSeat.includes(`${name}${i}`)
                  ? "bg-gray-400 hover:!bg-gray-400 cursor-not-allowed"
                  : ""
              }
              `}
              onClick={() => {
                handleSet(`${name}${i}`);
              }}
            >
              <span className="inline-block text-center  ">
                {i} {i}
              </span>
            </button>
          ) : (
            <button
              className={` md:h-5 h-4 border rounded md:text-s text-[10px] md:w-5 w-4 border-gray-300 ${
                selectedSeat.includes(`${name}${i}`)
                  ? "bg-yellow-300 text-white"
                  : "text-black transition duration-200 ease-in-out hover:bg-yellow-200 hover:border-transparent"
              } 
                ${
                  boughtSeat.includes(`${name}${i}`)
                    ? "bg-gray-400 hover:!bg-gray-400 cursor-not-allowed"
                    : ""
                }
                `}
              onClick={() => {
                handleSet(`${name}${i}`);
              }}
            >
              <span className="inline-block text-center ">{i}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <main className="bg-slate-100 md:pb-0 py-2">
      <div className="container mx-auto px-0 md:grid grid-cols-3">
        <div className="col-span-2 h-full xl:pb-1 pb-1">
          <div className="relative ">
            <div className="md:px-6 py-4 px-2 rounded md:mb-8 w-full">
              <div className="overflow-x-auto">
                <div className="flex justify-center items-center bg-white pt-4">
                  <div className="flex flex-col w-fit relative rounded-2xl after:content-['Screen'] after:text-sm after:mt-2 after:absolute after:top-0 border-0 border-t-4 border-red-500 after:left-1/2 after:-translate-x-1/2 after:rounded-full">
                    <div className="mt-10">
                      <SeatComponent name="A" quantity={15} />
                      <SeatComponent name="B" quantity={16} />
                      <SeatComponent name="C" quantity={14} />
                      <SeatComponent name="D" quantity={8} />
                      <SeatComponent name="E" quantity={16} />
                      <SeatComponent name="F" quantity={8} isDouble={true} />
                    </div>
                    <div className="seat__layout-screen">
                      <div className="text-sm flex flex-col-reverse justify-between items-center py-9 gap-2">
                        <div className="flex gap-5">
                          <div>
                            <span className="w-5 h-5 rounded bg-gray-200 inline-block align-middle"></span>
                            <span className="ml-2">Chair Sold</span>
                          </div>
                          <div>
                            <span className="w-5 h-5 rounded bg-yellow-200 inline-block align-middle"></span>
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

              <button className="" onClick={handlePay}>
                pay
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex col-span-1 xl:pl-4 xl:order-none order-first py-4">
          <p>kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p>
        </div>
      </div>
    </main>
  );
};

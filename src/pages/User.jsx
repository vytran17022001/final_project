import React from "react";
import { useState, useEffect } from "react";
import getData from "../utils/getData";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import dayjs from "dayjs";

export const User = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    const respOrder = await getData("order");
    const respShowtime = await getData("showtime");
    const respMovies = await getData("movie");

    const userOrders = respOrder.filter((order) => order.user_id === id);
    const newData = userOrders.map((order) => {
      const showtime = respShowtime.find((s) => s.id === order.showtime_id);
      const movieTime = respMovies.find((m) => m.id === showtime.movie_id);
      return {
        ...order,
        showtime_timeday: showtime?.showtime_timedate || "",
        movie_time: movieTime?.movie_name || "",
      };
    });
    setOrders(newData);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <main className="bg-white">
      <div className="grid grid-cols-3 gap-6 mx-auto max-w-screen-xl py-7 px-4 sm:px-6 lg:px-5 lg:pt-8">
        <div className="col-span-3">
          <div className="border-b-2 border-blue-10">
            <span className="border-l-4 border-solid border-blue-400 mr-2"></span>
            <h1 className="mb-3 text-xl inline-block uppercase font-medium">
              Order history
            </h1>
          </div>
          <div className="mt-5">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500 text-lg mt-10">
                No orders yet
              </p>
            ) : (
              <div className="space-y-6 max-h-[720px] overflow-y-auto pr-2">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center gap-6 transition hover:shadow-lg"
                  >
                    <div className="md:w-48 w-full flex justify-center md:justify-start">
                      {ord?.order_isPaid ? (
                        <div className="p-2 bg-white border rounded-lg shadow">
                          <QRCodeSVG
                            value={JSON.stringify({
                              movie: ord.movie_time,
                              time: ord.showtime_timeday,
                              chairs: ord.order_chair,
                              orderId: ord.id,
                            })}
                            size={120}
                          />
                        </div>
                      ) : (
                        <div className="animate-pulse h-32 w-32 bg-gray-300 rounded-lg" />
                      )}
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex justify-between flex-col md:flex-row gap-2">
                        <p className="text-gray-800 font-semibold text-lg">
                          {ord.movie_time}
                        </p>
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            ord.order_isPaid
                              ? "bg-green-100 text-green-500"
                              : "bg-yellow-100 text-red-500"
                          }`}
                        >
                          {ord.order_isPaid ? "Paid" : "Unpaid"}
                        </span>
                      </div>

                      <div className="text-gray-600 text-sm mt-2 space-y-1">
                        <p>
                          <span className="font-medium">Showtime:</span>{" "}
                          {dayjs(ord.showtime_timeday).format(
                            "DD/MM/YYYY hh:mm A"
                          )}
                        </p>
                        <p>
                          <span className="font-medium">Chair:</span>{" "}
                          {Array.isArray(ord.order_chair)
                            ? ord.order_chair.join(",")
                            : ord.order_chair}
                        </p>
                        <p>
                          <span className="font-medium">Order ID:</span>{" "}
                          {ord.id}
                        </p>
                        <p>
                          <span className="font-medium">Time of Order:</span>{" "}
                          {ord.order_createdAt?.seconds
                            ? new Date(
                                ord.order_createdAt.seconds * 1000
                              ).toLocaleString()
                            : "No Date"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

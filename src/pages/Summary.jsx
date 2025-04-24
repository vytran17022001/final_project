import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import getData from "../utils/getData";
import { QRCodeSVG } from "qrcode.react";
import postData from "../utils/postData";
import { AuthContext } from "../context/AuthProvider";
import { use } from "react";

const Summary = () => {
  const [order, setOrder] = useState(null);
  const [movie, setMovie] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const params = new URLSearchParams(location.search);
  const success = params.get("success");
  const movie_id = params.get("movie_id");
  const showtime_id = params.get("showtime_id");
  const selectedSeat = params.get("selected_seat").split(",");

  const checkOrderSuccess = async () => {
    if (!user) return;
    const movieList = await getData("movie");
    const movie = movieList.find((movie) => movie.id === movie_id);
    setMovie(movie);

    const showtimeList = await getData("showtime");
    const showtime = showtimeList.find(
      (showtime) =>
        (showtime.id === showtime_id) & (showtime.movie_id === movie_id)
    );
    setShowtime(showtime);
  };

  useEffect(() => {
    checkOrderSuccess(success);
  }, [user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      const orderList = await getData("order");
      const order = orderList.find(
        (order) =>
          order.showtime_id === showtime_id &&
          order.user_id === user?.id &&
          order.order_isPaid === true
      );
      if (!order) {
        const data = {
          order_createdAt: new Date(),
          order_isPaid: true,
          showtime_id,
          user_id: user.id,
          order_chair: selectedSeat,
        };
        const order = await postData("order", data);
        setOrder(order);
      }
      setOrder(order);
    };

    fetchData();
  }, [success]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      {order?.order_isPaid !== true && (
        <div className="bg-red-100 p-4 rounded-lg shadow mb-6">
          <div className="flex items-center justify-center mb-2">
            <h1 className="text-2xl font-bold text-red-700">
              Cant create your order...
            </h1>
          </div>
        </div>
      )}

      {order?.order_isPaid === true && (
        <div className="bg-green-100 p-4 rounded-lg shadow mb-6">
          <h1 className="text-2xl font-bold text-green-700 mb-2">
            Thank you for your order!
          </h1>
          <p className="text-green-600">
            Your payment was processed successfully.
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 bg-white rounded-lg shadow-lg p-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-gray-600">Order ID</p>
              <p className="font-semibold">{order?.id}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-gray-600">Movie</p>
              <p className="font-semibold">{movie?.movie_name}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-gray-600">Showtime</p>
              <p className="font-semibold">{showtime?.showtime_timedate}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-gray-600 mb-2">Items</p>
              <div className="space-y-2">
                {selectedSeat?.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-semibold border p-1 rounded-lg">
                      {item}
                    </span>
                    <span className="font-semibold">
                      {movie?.movie_price} VND
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600 w-max">Total Amount</p>
              <p className="font-semibold text-right w-max">
                {movie?.movie_price * selectedSeat.length} VND
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          {order?.order_isPaid === true ? (
            <QRCodeSVG
              value={[
                showtime?.showtime_timedate,
                order?.id,
                order?.order_chair,
                movie?.movie_name,
              ]}
              size={200}
            />
          ) : (
            <div className="animate-pulse h-48 w-48 bg-gray-500"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;

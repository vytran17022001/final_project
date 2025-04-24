import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import getData from "../utils/getData";

// Cấu hình Stripe key
const stripePromise = loadStripe(
  "pk_test_51QQPKiKONYCbAl8cHPaWvZ4LTGpLaw6iA8joMd4coUlWXfqK157wyEm2rRpV4MQLLBgCoTDk4C1IQw7fy8vcsjnL00OT5W44wR"
);

export const PaymentForm = ({ selectedSeat }) => {
  const { id, showtimeId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(0);

  // Lấy thông tin phim
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respMovie = await getData("movie");
        const data = respMovie.find((m) => m.id === id);
        setMovie(data);

        // Tính giá dựa trên số ghế đã chọn
        if (selectedSeat && selectedSeat.length > 0) {
          setPrice(selectedSeat.length * data.movie_price);
        }
      } catch (error) {
        console.error("Error while retrieving movie data:", error);
        setErrorMessage(
          "Movie information could not be loaded. Please try again."
        );
      }
    };
    fetchData();
  }, [selectedSeat, id]);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!selectedSeat || selectedSeat.length === 0) {
      setErrorMessage("Please select at least one seat");
      return;
    }

    setIsLoading(true);

    try {
      // Lấy đối tượng Stripe
      const stripe = await stripePromise;

      // check stripe
      if (!stripe) {
        setErrorMessage("Stripe could not be loaded. Please try again.");
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: movie.stripe_price_id,
            quantity: selectedSeat.length,
          },
        ],
        locale: "vi",
        mode: "payment",
        successUrl: `${window.location.origin}/summary?success=true&movie_id=${
          movie.id
        }&showtime_id=${showtimeId}&selected_seat=${selectedSeat.join(",")}`,
        cancelUrl: `${window.location.origin}/summary?success=false&movie_id=${
          movie.id
        }&showtime_id=${showtimeId}&selected_seat=${selectedSeat.join(",")}`,
      });

      if (error) setErrorMessage(error.message);
    } catch (error) {
      console.error("Error payment:", error);
      setErrorMessage("An error occurred during payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // view pay
  return (
    <div className="">
      <div className="p-6 bg-white shadow-md rounded-xl space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Thanh toán
        </h2>

        {movie && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={movie.movie_img}
                alt={movie.movie_name}
                className="object-cover h-40 w-auto rounded mr-2 shadow-md"
              />
              <div>
                <h3 className="font-semibold">{movie.movie_name}</h3>
                <p className="text-gray-500">
                  {selectedSeat?.length || 0} ghế x{" "}
                  {movie.movie_price?.toLocaleString()} VND
                </p>
                {selectedSeat?.length > 0 && (
                  <p className="font-medium">
                    Tổng: {price?.toLocaleString()} VND
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedSeat?.length > 0 && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="font-medium">Ghế đã chọn:</p>
            {selectedSeat.map((seat, index) => (
              <span
                key={index}
                className="inline-block bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-sm mr-2 mb-2"
              >
                {seat}
              </span>
            ))}
            <p className="text-gray-500 text-sm">
              Tổng số ghế đã chọn: {selectedSeat.length}
            </p>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={!selectedSeat?.length || isLoading}
          className="w-full bg-[#f26b38] text-white py-2 px-4 rounded-md hover:bg-orange-400 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isLoading ? "Loading..." : "Payment now"}
        </button>

        {errorMessage && (
          <div className="text-red-600 text-sm text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

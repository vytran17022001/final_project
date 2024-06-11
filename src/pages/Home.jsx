import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import deleteData from "../utils/deleteData";
import getData from "../utils/getData";

const Home = () => {
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    const data = await getData("User");
    setData(data);
  };

  const handleDelete = async (id) => {
    await deleteData("User", id);

    alert("Da xoa");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex items-center mt-20">
        <ul>
          {data.map((user) => (
            <li>
              {user.email}
              <button className="border" onClick={() => handleDelete(user.id)}>
                Xoa
              </button>
            </li>
          ))}
        </ul>
        {/* <button onClick={() => handleDelete("123")}>Xoa student</button> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;

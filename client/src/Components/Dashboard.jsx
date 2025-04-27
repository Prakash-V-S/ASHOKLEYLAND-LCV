import React, { useEffect, useState } from "react";
import Card from "./Card";
import { axiosService } from "../Utilities/Apiservices";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getData = async () => {
    try {
      const res = await axiosService.get("/users");
      if (res.status === 200) {
        setUsers(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="py-4 mx-2">
      {loading ? (
        <div className="flex flex-col items-center">
          {/* <img
            className="w-52"
            // src="src/assets/truck.gif"
            src="https://cdn.dribbble.com/users/1238723/screenshots/4794365/loading.gif"
            alt="Loading..."
          /> */}
          <h1 className="font-bold text-lg">
            Loading ... 🚚!
          </h1>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center mt-5">
          <h1 className="font-medium text-3xl">
            Card is empty
          </h1>
          <div className="mt-3">
            <button className="btn btn-primary m-3">
              <Link to="/create">Create</Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {users.map((user) => (
            <Card key={user._id} data={user} getData={getData} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
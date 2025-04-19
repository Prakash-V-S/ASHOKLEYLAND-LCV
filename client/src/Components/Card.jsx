import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const defaultImgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiZV0WxURh4QRU50JJMkKrbIC2Enn77UUqOwKbRb8R-wopOA7Tm2M1jFuVthM3TDyvsWY&usqp=CAU";

  return (
    <div className="w-80 bg-white rounded-2xl border border-gray-300 shadow-md overflow-hidden m-2 hover:shadow-lg transition duration-300 main-card">
      <Link
        to={`/dashboard/details/${data._id}`}
        state={{ data: data }}
        className="text-decoration-none text-black"
      >
        <div className="w-full h-80 bg-gray-100 border-b border-gray-300 flex items-center justify-center">
          <img
            src={data.img ? data.img : defaultImgUrl}
            alt={data.customerName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImgUrl;
            }}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold italic underline mb-2">{data.customerName}</h2>
          <p className="text-sm text-gray-700 mb-2">Model: {data.model}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;

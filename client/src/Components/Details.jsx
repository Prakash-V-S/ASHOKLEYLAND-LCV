import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosService } from "../Utilities/Apiservices";

const Details = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = state;
  const { _id, customerName, model, about, img, createdAt } = data;

  const defaultImgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiZV0WxURh4QRU50JJMkKrbIC2Enn77UUqOwKbRb8R-wopOA7Tm2M1jFuVthM3TDyvsWY&usqp=CAU";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleDelete = async (id) => {
    const result = confirm("Are you sure you want to delete?");
    if (result) {
      const res = await axiosService.delete(`/users/${id}`);
      if (res.status === 200) {
        navigate("/dashboard");
      }
    }
  };

  const openModal = (imgSrc) => {
    setModalImage(imgSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-xl shadow-xl mt-10 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <div className="w-72 h-72 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105">
            <img
              src={img || defaultImgUrl}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImgUrl;
              }}
              alt={customerName}
              onClick={() => openModal(img || defaultImgUrl)}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-grow min-w-0">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{customerName}</h1>
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">
              {model}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">About</h2>
            <div className="bg-gray-50 p-5 rounded-lg max-h-72 overflow-y-auto border border-gray-200">
              <p className="text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
                {about}
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Created: {new Date(createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-wrap gap-6 justify-center md:justify-start">
        <Link
          to="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-all shadow-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-opacity animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full flex justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-md z-10"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Large View"
              className="object-contain max-w-full max-h-[90vh] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;

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
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <div className="w-64 h-64 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow">
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
        <div className="flex-grow min-w-0"> {/* Added min-w-0 to prevent flex item overflow */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{customerName}</h1>
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {model}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
            <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
              <p className="text-gray-700 whitespace-pre-wrap break-words"> {/* Added break-words */}
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
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </Link>
        {/* <button
          onClick={() => handleDelete(_id)}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete
        </button> */}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-2 rounded-lg max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-3 -right-3 bg-red-500 text-white text-xl w-8 h-8 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Large View"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
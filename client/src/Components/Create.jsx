import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosService } from "../Utilities/Apiservices";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import Swal from 'sweetalert2';

function Create() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      customerName: "",
      model: "",
      about: "",
      img: "",
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Customer name is required"),
      model: Yup.string().required("Model is required"),
      about: Yup.string().required("About is required"),
      img: Yup.string().required("Image is required"),
    }),
    onSubmit: async (values) => {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Submit!",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
      });

      if (!confirm.isConfirmed) return;

      try {
        const res = await axiosService.post("/users", values);
        if (res.status === 201) {
          await Swal.fire({
            title: "Success!",
            text: "User created successfully!",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
          navigate("/dashboard");
        }
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#dc3545",
        });
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')", // Replace with your own image URL
      }}
    >
      <Form
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center text-blue-900 underline mb-4">
          Customer Details
        </h1>

        {/* Customer Name */}
        <Form.Group>
          <Form.Label className="font-semibold text-gray-700">Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer name"
            name="customerName"
            onChange={formik.handleChange}
            value={formik.values.customerName}
            onBlur={formik.handleBlur}
            className="shadow-sm"
          />
          {formik.touched.customerName && formik.errors.customerName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.customerName}</div>
          )}
        </Form.Group>

        {/* Model */}
        <Form.Group>
          <Form.Label className="font-semibold text-gray-700">Model</Form.Label>
          <Form.Select
            name="model"
            onChange={formik.handleChange}
            value={formik.values.model}
            onBlur={formik.handleBlur}
            className="shadow-sm"
          >
            <option value="">Select model</option>
            <option value="DOST">DOST</option>
            <option value="BADADOST">BADADOST</option>
            <option value="PARTNER">PARTNER</option>
            <option value="MiTR">MiTR</option>
          </Form.Select>
          {formik.touched.model && formik.errors.model && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.model}</div>
          )}
        </Form.Group>

        {/* Upload Image */}
        <Form.Group>
          <Form.Label className="font-semibold text-gray-700">Upload Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const options = { maxSizeMB: 1, maxWidthOrHeight: 1080, useWebWorker: true };
                try {
                  const compressedFile = await imageCompression(file, options);
                  if (compressedFile.size > 2 * 1024 * 1024) {
                    Swal.fire({
                      title: "Too Large!",
                      text: `Image must be less than 2MB after compression.`,
                      icon: "warning",
                    });
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    formik.setFieldValue("img", reader.result);
                  };
                  reader.readAsDataURL(compressedFile);
                } catch (error) {
                  Swal.fire({
                    title: "Compression Failed",
                    text: error.message,
                    icon: "error",
                  });
                }
              }
            }}
            onBlur={formik.handleBlur}
            className="shadow-sm"
          />
          {formik.touched.img && formik.errors.img && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.img}</div>
          )}
          {/* Preview */}
          {formik.values.img && (
            <div className="mt-4">
              <img
                src={formik.values.img}
                alt="Preview"
                className="w-full h-64 object-contain border rounded-md shadow-sm"
              />
            </div>
          )}
        </Form.Group>

        {/* About */}
        <Form.Group>
          <Form.Label className="font-semibold text-gray-700">About</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter details about customer"
            rows={4}
            name="about"
            onChange={formik.handleChange}
            value={formik.values.about}
            onBlur={formik.handleBlur}
            className="shadow-sm"
          />
          {formik.touched.about && formik.errors.about && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.about}</div>
          )}
        </Form.Group>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Create;

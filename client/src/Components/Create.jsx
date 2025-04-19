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
    validationSchema: Yup.object().shape({
      customerName: Yup.string().required("Customer name is Required"),
      model: Yup.string().required("Model is Required"),
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
        confirmButtonColor: "#dc3545", // Red
        cancelButtonColor: "#6c757d", // Gray
        buttonsStyling: true,
        customClass: {
          confirmButton: 'swal2-confirm swal2-styled swal2-danger', // Add danger class for red button
          cancelButton: 'swal2-cancel swal2-styled'
        }
      });
    
      if (!confirm.isConfirmed) return;
    
      try {
        const res = await axiosService.post("/users", values);
        if (res.status === 201) {
          await Swal.fire({
            title: "Success!",
            text: "User created successfully!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#28a745", // Green
            timer: 3000,
            customClass: {
              confirmButton: 'swal2-confirm swal2-styled'
            }
          });
          navigate("/dashboard");
        }
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#dc3545", // Red
          customClass: {
            confirmButton: 'swal2-confirm swal2-styled swal2-danger'
          }
        });
      }
    },
  });

  return (
    <Form
      className="container mt-3 mb-3"
      style={{ maxWidth: "780px" }}
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-xl font-bold underline">User Details</h1>

      {/* Customer Name */}
      <Form.Group className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Customer Name"
          name="customerName"
          onChange={formik.handleChange}
          value={formik.values.customerName}
          onBlur={formik.handleBlur}
        />
        {formik.touched.customerName && formik.errors.customerName && (
          <div style={{ color: "red" }}>{formik.errors.customerName}</div>
        )}
      </Form.Group>

      {/* Model */}
      <Form.Group className="mb-3">
        <Form.Label>Model</Form.Label>
        <Form.Select
          name="model"
          onChange={formik.handleChange}
          value={formik.values.model}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Model</option>
          <option value="DOST">DOST</option>
          <option value="BADADOST">BADADOST</option>
          <option value="PARTNER">PARTNER</option>
          <option value="MiTR">MiTR</option>
        </Form.Select>
        {formik.touched.model && formik.errors.model && (
          <div style={{ color: "red" }}>{formik.errors.model}</div>
        )}
      </Form.Group>

      {/* Image Upload with Compression */}
      <Form.Group className="mb-3">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1080,
                useWebWorker: true,
              };

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
        />
        {formik.touched.img && formik.errors.img && (
          <div style={{ color: "red" }}>{formik.errors.img}</div>
        )}
        {/* Preview */}
        {formik.values.img && (
          <img
            src={formik.values.img}
            alt="Preview"
            className="mt-2"
            style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
          />
        )}
      </Form.Group>

      {/* About */}
      <Form.Group className="mb-3">
        <Form.Label>About</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter details about user"
          rows={3}
          name="about"
          onChange={formik.handleChange}
          value={formik.values.about}
          onBlur={formik.handleBlur}
        />
        {formik.touched.about && formik.errors.about && (
          <div style={{ color: "red" }}>{formik.errors.about}</div>
        )}
      </Form.Group>

      <Button className="btn bg-blue-900 text-white" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Create;

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosService } from "../Utilities/Apiservices";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Create() {
  const navigate = useNavigate();
  const params = useParams();
  const [initialValuesMap, setValues] = useState({
    book: {
      title: "",
      ISBN: "",
      pub: "",
      img: "",
      about: "",
    },
    author: {
      name: "",
      birth: "",
      bio: "",
      img: "",
    },
  });

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const { id } = params;
    try {
      const response = await axiosService.get(`/users/${id}`);
      if (response.status === 200) {
        const { data } = response;
        setValues({
          book: {
            title: data.book.title,
            ISBN: data.book.ISBN,
            pub: new Date(data.book.pub).toISOString().split("T")[0],
            img: data.book.img,
            about: data.book.about,
          },
          author: {
            name: data.author.name,
            birth: new Date(data.author.birth).toISOString().split("T")[0],
            bio: data.author.bio,
            img: data.author.img,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValuesMap,
    validationSchema: Yup.object().shape({
      book: Yup.object().shape({
        title: Yup.string().required("Title is Required"),
        ISBN: Yup.string()
          .required("ISBN number required")
          .matches(/^\d{13}$/, "Enter a valid 13 - Digit ISBN Number"),
        pub: Yup.date().required("Published date Required"),
        about: Yup.string().required("About Book is required"),
        img: Yup.string().required("Image URL is required"),
      }),
      author: Yup.object().shape({
        name: Yup.string().required("Author name is Required"),
        birth: Yup.date().required("birth date Required"),
        bio: Yup.string().required("Biography is required"),
        img: Yup.string().required("Image URL is required"),
      }),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const { id } = params;
        const res = await axiosService.put(`users/${id}`, values);
        if (res.status === 200) {
          navigate("/dashboard");
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form
      className="container mt-3 mb-3"
      style={{ maxWidth: "780px" }}
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-xl font-bold underline">Book Details</h1>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Book Title"
          name="book.title"
          onChange={formik.handleChange}
          value={formik.values.book.title}
          onBlur={formik.handleBlur}
        />
        {formik.touched.book?.title && formik.errors.book?.title ? (
          <div style={{ color: "red" }}>{formik.errors.book.title}</div>
        ) : null}
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formISBN">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="ISBN number"
            name="book.ISBN"
            onChange={formik.handleChange}
            value={formik.values.book.ISBN}
            onBlur={formik.handleBlur}
          />
          {formik.touched.book?.ISBN && formik.errors.book?.ISBN ? (
            <div style={{ color: "red" }}>{formik.errors.book.ISBN}</div>
          ) : null}
        </Form.Group>
        <Form.Group as={Col} controlId="formPublished">
          <Form.Label>Published</Form.Label>
          <Form.Control
            type="date"
            name="book.pub"
            onChange={formik.handleChange}
            value={formik.values.book.pub}
            onBlur={formik.handleBlur}
          />
          {formik.touched.book?.pub && formik.errors.book?.pub ? (
            <div style={{ color: "red" }}>{formik.errors.book.pub}</div>
          ) : null}
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formImg">
        <Form.Label>Book Cover Image</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter image URL"
          name="book.img"
          onChange={formik.handleChange}
          value={formik.values.book.img}
          onBlur={formik.handleBlur}
        />
        {formik.touched.book?.img && formik.errors.book?.img ? (
          <div style={{ color: "red" }}>{formik.errors.book.img}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAbout">
        <Form.Label>About</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter about book"
          rows={3}
          name="book.about"
          onChange={formik.handleChange}
          value={formik.values.book.about}
          onBlur={formik.handleBlur}
        />
        {formik.touched.book?.about && formik.errors.book?.about ? (
          <div style={{ color: "red" }}>{formik.errors.book.about}</div>
        ) : null}
      </Form.Group>
      <h1 className="text-xl font-bold underline">Author Details</h1>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formAuthorName">
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author name"
            name="author.name"
            onChange={formik.handleChange}
            value={formik.values.author.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.author?.name && formik.errors.author?.name ? (
            <div style={{ color: "red" }}>{formik.errors.author.name}</div>
          ) : null}
        </Form.Group>
        <Form.Group as={Col} controlId="formAuthorBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="author.birth"
            onChange={formik.handleChange}
            value={formik.values.author.birth}
            onBlur={formik.handleBlur}
          />
          {formik.touched.author?.name && formik.errors.author?.name ? (
            <div style={{ color: "red" }}>{formik.errors.author.name}</div>
          ) : null}
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formAuthorImg">
        <Form.Label>Author Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter author image URL"
          name="author.img"
          onChange={formik.handleChange}
          value={formik.values.author.img}
          onBlur={formik.handleBlur}
        />
        {formik.touched.author?.img && formik.errors.author?.img ? (
          <div style={{ color: "red" }}>{formik.errors.author.img}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBio">
        <Form.Label>Biography</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter biography"
          rows={3}
          name="author.bio"
          onChange={formik.handleChange}
          value={formik.values.author.bio}
          onBlur={formik.handleBlur}
        />
        {formik.touched.author?.bio && formik.errors.author?.bio ? (
          <div style={{ color: "red" }}>{formik.errors.author.bio}</div>
        ) : null}
      </Form.Group>

      <Button className="btn bg-blue-900" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Create;

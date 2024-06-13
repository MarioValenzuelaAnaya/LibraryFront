import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchBooks, addBook, updateBook } from "../features/tasks/booksSlice";
import { fetchLoans } from "../features/tasks/loanSlice";

function TaskForm() {
  const [initialValues, setInitialValues] = useState({
    title: "",
    author: "",
    CopiesAvailable: 0,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const books = useSelector((state) => state.books);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    CopiesAvailable: Yup.number()
      .required("Copies Available is required")
      .positive("Copies Available must be positive"),
  });

  useEffect(() => {
    if (params.id) {
      const id = Number(params.id);
      const book = books.list.find((task) => task.id === id);
      if (book) {
        console.warn(book);
        setInitialValues({
          title: book.title,
          author: book.author,
          CopiesAvailable: book.copiesAvailable,
        });
      }
    }
  }, [params.id, books.list]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (params.id) {
        await dispatch(updateBook({ ...values, id: params.id }));
        await dispatch(fetchLoans());
      } else {
        await dispatch(addBook({ ...values }));
        await dispatch(fetchLoans());
      }
      await dispatch(fetchBooks());
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white max-w-sm p-4 rounded-lg shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form>
            <label className="block text-sm font-bold text-neutral-800">Title:</label>
            <Field
              type="text"
              name="title"
              className="w-full p-2 rounded-md bg-gray-100 mb-2 text-neutral-600"
              placeholder="Write a title"
            />
            <ErrorMessage name="title" component="div" className="text-red-500" />

            <label className="block text-sm font-bold text-neutral-800"  >Author:</label>
            <Field
              type="text"
              name="author"
              className="w-full p-2 rounded-md bg-gray-100 mb-2 text-neutral-600"
              placeholder="Write an author"
            />
            <ErrorMessage name="author" component="div" className="text-red-500" />

            <label className="block text-sm font-bold  text-neutral-800">Copies Available:</label>
            <Field
              type="number"
              name="CopiesAvailable"
              className="w-full p-2 rounded-md bg-gray-100 mb-2 text-neutral-600"
              placeholder="Write a number"
            />
            <ErrorMessage name="CopiesAvailable" component="div" className="text-red-500" />

            <button type="submit" disabled={isSubmitting} className="bg-indigo-600 px-2 py-1 text-white rounded">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;

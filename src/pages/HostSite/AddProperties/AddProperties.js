import styles from "./AddProperties.module.css";
import ScrollToTop from "../../../components/ScrollToTop";
import React from "react";
import classNames from "classnames/bind";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import LayoutPrimary from "layouts/LayoutPrimary";
import Form from "../../../module/hotel/Form";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function AddProperties() {
  const navigate = useNavigate();

  const customer = (() => {
    const storageRoomsData = JSON.parse(localStorage.getItem("userData"));

    return storageRoomsData ?? [];
  })();

  const handleAddHotel = async (values) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_HOTEL}/customer/${customer.id}/hotel`,
        JSON.stringify(values)
      );
      navigate("/AddRoomForm", {
        state: { id: res.data.id, update: "notUpdate" },
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <LayoutPrimary host>
      <ScrollToTop />

      <Formik
        initialValues={{
          name: "",
          star_level: "4",
          rule: "",
          description: "",
          address: {
            detail_address: "",
            district: "",
            province: "",
          },
          list_image: [
            {
              url: "https://cf.bstatic.com/xdata/images/hotel/square600/46129592.webp?k=e23728804b1c260cf7c6e8cbc1ee4f917508f462ad3e3839f91a4138b9b2c686&o=&s=1",
              type: "hotel",
            },
            {
              url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/310596687.jpg?k=4aadd27e94206405b1cac5056006dd7ea63e075e29077d3c8f199d333b2f6727&o=&hp=1",
              type: "user",
            },
            {
              url: "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=600",
              type: "user",
            },
            {
              url: "https://images.pexels.com/photos/13740128/pexels-photo-13740128.jpeg?auto=compress&cs=tinysrgb&w=600",
              type: "user",
            },
            {
              url: "https://images.pexels.com/photos/14011091/pexels-photo-14011091.jpeg?auto=compress&cs=tinysrgb&w=600",
              type: "user",
            },
            {
              url: "https://images.pexels.com/photos/14011091/pexels-photo-14011091.jpeg?auto=compress&cs=tinysrgb&w=600",
              type: "user",
            },
          ],
        }}
        initialTouched={{
          field: true,
        }}
        validateOnMount
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
        })}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);
          handleAddHotel(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={cx("sign-up__form")}>
            <Form></Form>
          </form>
        )}
      </Formik>
    </LayoutPrimary>
  );
}

export default AddProperties;

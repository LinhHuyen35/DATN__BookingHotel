import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./form.module.css";
import MyInput from "components/MyInput/MyInput";
import SelectFormik from "components/SelectFormik/SelectFormik";
import TextAreaFormik from "components/TextAreaFormik/TextAreaFormik";
import city from "../../json/province.json";
import Button from "components/Button/Button";
import ConfirmModal from "module/modal/confirmModal";

const cx = classNames.bind(styles);
const province = city.data;
const Form = ({ setShowConfirmation }) => {
  return (
    <div className={cx("add3-properties")}>
      <div>
        {/* <ImageGallery images={images} /> */}
        <div className={cx("content3-container")}>
          <div className={cx("input-container")}>
            <h1
              className={cx("title")}
              style={{
                fontSize: "2em",
                marginBottom: "25px",
                fontWeight: "700",
              }}
            >
              Add New Property
            </h1>
            <MyInput
              customContainerClasses={cx("custom-container")}
              label="Hotel Name"
              type="text"
              name="name"
              className={cx("name")}
              placeholder={"Enter your Hotel Name"}
            ></MyInput>
          </div>
          <div className={cx("input-container")}>
            <h3 className="text-3xl font-bold">Add Your location.</h3>
            <div className={cx("location-input__wrapper")}>
              <div className={cx("location-input")}>
                <SelectFormik name="address.province" label="Province">
                  {province.map((i, index) => (
                    <option key={index} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </SelectFormik>
                <SelectFormik name="address.district" label="District">
                  <option value="CauGiay">Cau Giay</option>
                  <option value="BaDinh">Ba Dinh </option>
                  <option value="HoangMai">Hoang Mai</option>
                </SelectFormik>
              </div>
              <div>
                <MyInput
                  label="Address"
                  type="text"
                  name="address.detail_address"
                  className={cx("name")}
                  placeholder={"Enter your address"}
                ></MyInput>
              </div>
            </div>
          </div>

          <div className={cx("input-container")}>
            <div>
              <h3
                className="text-3xl font-bold"
                style={{ marginBottom: "25px" }}
              >
                Add description at your place.
              </h3>
            </div>
            <div>
              <TextAreaFormik
                label="Introduce yourself"
                name="description"
                placeholder="Enter your introduce"
                id="intro"
                className={cx("text-area")}
              ></TextAreaFormik>
            </div>
          </div>
          <Button
            className={cx("save")}
            green
            rounded
            type="button"
            onClick={() => {
              setShowConfirmation(true);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;

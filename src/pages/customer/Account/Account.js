import React, { useEffect, useState } from "react";
import styles from "./Account.module.css";
import NavBar from "../../../components/nav/nav";
import Footer from "../../../components/footer/footer";
import avatar from "../../../assets/img/Vector.png";
import axios from "axios";
import { Formik } from "formik";
import MyInput from "../../../components/MyInput/MyInput";
import { AiOutlineCheck, AiFillStar, AiOutlineClose } from "react-icons/ai";

import classNames from "classnames/bind";
import Button from "../../../components/Button/Button";
import UploadAndDisplayImage from "components/UploadImage";

const cx = classNames.bind(styles);
function Account() {
  const account = (() => {
    const storageRoomsData = JSON.parse(localStorage.getItem("userData"));

    return storageRoomsData ?? false;
  })();

  const [accountData, setAccountData] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const { name } = account.user;
  const handleEdit = () => {
    setEditProfile(!editProfile);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HTTSPURL}/customer/${account.id}`)
      .then(function (response) {
        setAccountData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [account.id]);
  return (
    <div className={cx("account")}>
      <NavBar />
      <div className={cx("account-container")}>
        <div className={cx("col-left")}>
          <img className={cx("account-avatar")} src={avatar} alt="hieu" />
          <p className={cx("upload")}>Upload a Photo</p>
          {/* <input type="file" /> */}
          <div className={cx("account-verification__container")}>
            <div className={cx("account-verification")}>
              Identity Verification
            </div>
            <div className={cx("account-verification__desc")}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </div>
          </div>
          <div className={cx("account-status__container")}>
            <h2 className={cx("account-status")}>{name}</h2>
            <div className={cx("email-status")}>
              <AiOutlineCheck />
              Email Confirmed
            </div>
            <div className={cx("mobile-status")}>
              <AiOutlineCheck />
              Mobile Confirmed
            </div>
          </div>
        </div>
        <div className={cx("col-right")}>
          <div className={cx("account-information")}>
            <h2 className={cx("account-name")}>Hello, {name} </h2>
            <div className={cx("account-regis-date")}>Joined in 2021</div>
          </div>
          {!editProfile ? (
            <div className={cx("wrapper")}>
              <Button outline transparent onClick={handleEdit}>
                Edit Profile
              </Button>
              <div className={cx("account-review")}>
                <i>
                  <AiFillStar />
                </i>
                <div className={cx("review")}>0 reviews</div>
              </div>
              <div className={cx("reviewed-by")}>Reviewed By You</div>
            </div>
          ) : (
            <Formik
              initialValues={{
                id: 20,
                role: account.role,
                user: {
                  id: 22,
                  name: account.user.name,
                  email: account.user.email,
                  phone: account.user.phone,
                  note: "hok co ji",
                  avatar: "link anh",
                  gender: "male",
                  account_id: 4,
                  address: {
                    id: 157,
                    district: "Quận Cầu d",
                    province: "Hà Nội",
                    detail_address: "98 Quận Từ Liêm, Hà Nội",
                    type: "customer",
                  },
                },
              }}
              initialTouched={{
                field: true,
              }}
              validateOnMount
              onSubmit={(values, { resetForm, setSubmitting }) => {
                // console.log(values);
                setTimeout(() => {
                  //   // setSignUpAccount(() => {
                  //   //   const newData = [...signUpAccount, values];
                  //   //   const jsonData = JSON.stringify(newData);
                  //   //   localStorage.setItem("signUpAccount", jsonData);
                  //   // });
                  axios
                    .put(
                      `${process.env.REACT_APP_HTTSPURL}/customer/${account.id}`,
                      JSON.stringify(values)
                    )
                    .then(function (response) {
                      console.log(response);
                      console.log("succes");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                  // console.log(JSON.stringify(values));
                  // navigate(host ? "/LoginHost" : "/login1");
                  console.log(values);
                  setSubmitting(false);
                }, 1000);
              }}
            >
              {(formik) => (
                <form
                  onSubmit={formik.handleSubmit}
                  className={cx("sign-up__form")}
                >
                  <MyInput
                    type="text"
                    label="Full Name"
                    account
                    className={cx("input")}
                    name="user.name"
                    placeholder="Enter your number"
                  ></MyInput>
                  <MyInput
                    type="text"
                    label="Email"
                    account
                    className={cx("input")}
                    name="user.email"
                    placeholder="Enter your Email "
                  ></MyInput>

                  <MyInput
                    type="text"
                    label="Phone Number"
                    account
                    className={cx("input")}
                    name="user.phone"
                    placeholder="Enter your number"
                  ></MyInput>

                  {/* <MyInput
                    type="text"
                    label="Location"
                    account
                    className={cx("input")}
                    name="user.address"
                    placeholder="Enter your number"
                  ></MyInput> */}
                  <br />
                  {/* <label>
                    Work
                    <br />
                    <input className={cx("input")} type="text" name="work" />
                  </label>
                  <br /> */}
                  <div className={cx("form-bottom")}>
                    <div className={cx("form-desc")}>
                      All the required user information can be added here...
                    </div>
                    <div className={cx("button-container")}>
                      <Button
                        leftIcon={<AiOutlineClose />}
                        onClick={handleEdit}
                        transparent
                        className={cx("button")}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        // onClick={handleEdit}
                        fourth
                        black
                        className={cx("button")}
                        // disabled={!formik.isValid || formik.isSubmitting}
                      >
                        Save
                      </Button>
                    </div>
                  </div>

                  {/* <Button
                    className={cx("sign-up__button", "disabled")}
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Sign Up
                  </Button> */}
                  <UploadAndDisplayImage />
                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;

import styles from './UpdateHotel.module.css';
import ScrollToTop from '../../../components/ScrollToTop';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import LayoutPrimary from 'layouts/LayoutPrimary';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '../../../module/hotel/Form';
import ConfirmModal from 'module/modal/confirmModal';

const cx = classNames.bind(styles);

function UpdateHotel() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state.hotel;
  const [showConfirmation, setShowConfirmation] = useState(false);
  console.log(data);
  const UpdateSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    address: Yup.object().shape({
      detail_address: Yup.string().required('Required'),
    }),
  });

  const putData = async (values) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_HOTEL}/hotel/${data.id}`,
        JSON.stringify(values)
      );
      alert('Update Succesfully');
      navigate('/HostProperties');
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };
  return (
    <LayoutPrimary host>
      <ScrollToTop />

      <Formik
        initialValues={{
          id: data.id,
          name: data.name,
          star_level: data.star_level,
          address: {
            id: 126,
            district: data.address.district,
            province: data.address.province,
            detail_address: data.address.detail_address,
          },
          list_image: data.list_image,
        }}
        initialTouched={{
          field: true,
        }}
        validationSchema={UpdateSchema}
        validateOnMount
        onSubmit={(values, { resetForm, setSubmitting }) => {
          putData(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={cx('sign-up__form')}>
            {showConfirmation && (
              <ConfirmModal
                hiddenFunction={formik.handleSubmit}
                setShowConfirmation={setShowConfirmation}
                message="Are You Sure"
              />
            )}
            <Form setShowConfirmation={setShowConfirmation} update></Form>
          </form>
        )}
      </Formik>
    </LayoutPrimary>
  );
}

export default UpdateHotel;

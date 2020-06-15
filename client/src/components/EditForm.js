import React from 'react';
import { Formik, Form, Field } from 'formik';
import InputField from './InputField';
import * as Yup from 'yup';

const editSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Name entered was too short')
    .max(40, 'Name entered was too long'),
  lastName: Yup.string()
    .min(2, 'Name entered was too short')
    .max(40, 'Name entered was too long'),
  email: Yup.string().email('invalid email'),
  school: Yup.string()
    .min(2, 'School name entered was too short')
    .max(40, 'School name entered was too long'),
  position: Yup.string()
    .min(2, 'Position entered was too short')
    .max(40, 'Position entered was too long'),
  department: Yup.string()
    .min(2, 'Department entered was too short')
    .max(40, 'Department entered was too long'),
});

export const EditForm = () => {
    return(
  <div className='post-feed edit-form'>
    <h1>Edit Profile</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        school: '',
        position: '',
        department: '',
      }}
      validationSchema={editSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <label htmlFor='firstName'>
            {'First Name'}
          </label>
          <Field name="firstName" />
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}
          <label htmlFor='lastName'>
            {'Last Name'}
          </label>
          <Field name='lastName' />
          {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
          ) : null}
          <label htmlFor='email'>
            {'Email address'}
          </label>
           <Field name='email' />
          {errors.email && touched.email ? (
              <div>{errors.email}</div>
          ) : null}
          <label htmlFor='school'>
            {'School'}
          </label>
            <Field name='school' />
          {errors.school && touched.school ? (
              <div>{errors.school}</div>
          ) : null}
          <label htmlFor='position'>
            {'Position'}
          </label>
            <Field name='position' />
          {errors.position && touched.position ? (
              <div>{errors.position}</div>
          ) : null}
          <label htmlFor='department'>
            {'Department'}
          </label>
           <Field name='department' />
          {errors.department && touched.department ? (
              <div>{errors.department}</div>
          ) : null}
           <button type="submit">Submit Edits</button>
        </Form>
    )}
    </Formik>
  </div>);
};


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Navigate } from "react-router-dom";
import {useContext } from 'react';
import UserContext from "../utils/UserContext";
import logo from '../../assests/logo.png';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const {state} = useLocation();

  const loginUser = (values) => {
    let response = {};
    //do some authentication and server response
    if(values.email === "arjunshahcool@gmail.com") {
      response = {
        name : "arjun@1234",
        email : values.email,
        authenticated : true
      }
    } else {
      response = {
        authenticated : false
      }
    }
    
    return response;
  }

  return (
  <div className="login-container mt-[100px] min-h-9 text-center flex">
  
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const response = await loginUser(values);
        console.log("OnSubmit", response);
        setUser(response);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="border border-gray shadow basis-[500px] h-[400px] m-auto flex items-center justify-center flex-col gap-3 mob:basis-[300px] mob:h-[360px]">
          <span className="text-blue-dark text-lg font-extrabold mob:text-sm">{state.msg ? state.msg : "Welcome to Insta Food. "} Please Login!</span>

          <img className="w-[70px] ml-2.5 mob:mx-auto" alt="logo" src= {logo} />
          {isSubmitting && <div>Loading...</div>}
          <div className="flex justify-center p-2.5">
            <label htmlFor="p-2.5 w-[100px] mob:text-left mob:h-8 mob:text-sm" className="email-label">Email</label>
            <Field type="email" name="email" id="email" className="outline-none p-1 text-sm h-10 w-[200px] rounded-md bg-gray mob:w-[180px] mob:h-8"/>
            <ErrorMessage name="email" component="div"  id="pwd" />
          </div>

          <div className="pwd flex justify-center p-2.5">
            <label htmlFor="password" className="pwd-label p-2.5 w-[100px] mob:text-left mob:h-8 mob:text-sm">Password</label>
            <Field type="password" name="password" id="pwd" className="outline-none p-1 text-sm h-10 w-[200px] rounded-md bg-gray mob:w-[180px] mob:h-8"/>
            <ErrorMessage name="password" component="div" />
          </div>

          <div className='submit'>
            <button className="submit-btn" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>

            

        </Form>
      )
      
    }
    </Formik>
    { user.authenticated  && <Navigate to="/" state={user} replace={true} />}
  </div>


  )}



export default Login;
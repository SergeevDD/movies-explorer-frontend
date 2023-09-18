import React from 'react';
import { Navigate } from "react-router-dom";

const UnknownUserElement = ({ element: Component, ...props }) => {
  return (
    props.loggedIn ? <Navigate to="/" replace={true}  /> : <Component {...props} />
  )
};

export default UnknownUserElement;

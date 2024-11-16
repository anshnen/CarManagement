import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Updated to use Navigate
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <Route
      {...rest}
      element={user ? <Component /> : <Navigate to="/login" />} // Use Navigate instead of Redirect in v6
    />
  );
}

export default PrivateRoute;
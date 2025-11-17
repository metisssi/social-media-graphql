// src/util/AuthRoute.js
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth";

function AuthRoute({ children }) {
  const { user } = useContext(AuthContext);

  // если пользователь залогинен — редирект на главную
  if (user) {
    return <Navigate to="/" replace />;
  }

  // если нет пользователя — показываем дочерние элементы
  return children ? children : <Outlet />;
}

export default AuthRoute;

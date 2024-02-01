import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./../firebase/config";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      localStorage.setItem("TOKEN", user.uid);
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
    return () => unsub();
  }, []);

  if (isAuth === false && !localStorage.getItem("TOKEN")) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

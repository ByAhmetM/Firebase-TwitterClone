import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./../firebase/config";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [kullanici, setKullanici] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      localStorage.setItem("TOKEN", user.uid);
      setKullanici(user.uid);
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
    return () => unsub();
  }, []);

  const activeUserToken = localStorage.getItem("TOKEN");
  console.log(kullanici);
  if (isAuth === false && activeUserToken != kullanici) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

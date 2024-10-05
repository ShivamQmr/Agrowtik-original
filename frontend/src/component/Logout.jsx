import React from "react";
import { useAuth } from "../context/AuthProvider";

const Logout = ({ design }) => {
  const [authUser, setAuthUser] = useAuth();

  const handleLogOut = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("user");
      window.location.reload();
    } catch (error) {
      console.log(error, error.message);
    }
  };

  return (
    <>
      <span onClick={handleLogOut} className={design}>
        Sign out
      </span>
    </>
  );
};

export default Logout;

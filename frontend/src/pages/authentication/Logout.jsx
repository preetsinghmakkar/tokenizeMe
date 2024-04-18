import React, { useEffect } from "react";
import { authComponentState } from "../../atom/authComponentState";
import { useSetRecoilState } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const setAuthComponent = useSetRecoilState(authComponentState);

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const res = await axios.post("/api/users/logout");
        const data = await res.data;

        if (data.error) {
          toast.error("Unable to Logout");
          return;
        }

        localStorage.removeItem("tokenizeMe");
        setAuthComponent(null);
        window.location.reload();
      } catch (error) {
        toast.error("Unable to Logout");
      }
    };
    handleSubmit();
  }, []);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Logout;

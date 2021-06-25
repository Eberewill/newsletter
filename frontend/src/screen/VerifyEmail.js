import React, { useEffect, useState } from "react";
import axios from "axios";

const VerifyEmail = ({ history }) => {
  const verifyUserEmail = (ref, cb) => {
    axios.post(`/api/v1/newslatter/verify/`, ref);
    cb();
  };

  const ref = new URL(window.location.href).searchParams.get("ref");

  useEffect(() => {
    if (!ref) {
      history.push("/");
    }
    verifyUserEmail(ref, () => {
      window.location.replace("https://www.google.com");
    });
  }, []);

  return <div></div>;
};

export default VerifyEmail;

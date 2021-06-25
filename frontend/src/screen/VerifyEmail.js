import React, { useEffect, useState } from "react";
import axios from "axios";

const VerifyEmail = ({ history }) => {
  const verifyUserEmail = (ref) => {
    return new Promise((resolve, reject) => {
      const body = { ref: ref };
      const { data } = axios.post(`/api/v1/newslatter/verify/`, body);
      if (data) {
        resolve(data);
      } else {
        reject("something went wrong while sending request");
      }
    });
  };

  const ref = new URL(window.location.href).searchParams.get("ref");

  useEffect(() => {
    if (!ref) {
      history.push("/");
    }
    verifyUserEmail(ref)
      .then(window.location.replace("https://www.google.com"))
      .catch((err) => alert(err));
  }, []);

  return <div></div>;
};

export default VerifyEmail;

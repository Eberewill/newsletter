import React, { useEffect, useState } from "react";
import axios from "axios";

const VerifyEmail = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const verifyUserEmail = async (ref) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const body = { ref: ref };
      const { data } = axios.post(`/api/v1/newslatter/verify/`, body);
      setLoading(false);
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
    verifyUserEmail(ref).then(
      window.location.replace("https://www.google.com")
    );
  }, [history]);

  return <div>{loading && <h3> Loading...</h3>}</div>;
};

export default VerifyEmail;

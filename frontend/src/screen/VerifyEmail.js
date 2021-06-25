import React, { useEffect, useState } from "react";
import axios from "axios";

const VerifyEmail = ({ history }) => {
  const [response, setResponse] = useState();

  const verifyUserEmail = async (ref) => {
    const { data } = await axios.post(`/api/v1/newslatter/verify/`, ref);
    if (data) {
      setResponse(data);
    }
  };

  const ref = new URL(window.location.href).searchParams.get("ref");

  useEffect(() => {
    if (!ref) {
      history.push("/");
    }
    verifyUserEmail(ref);
    if (response) {
      history.push("https://www.google.com/");
    }
  }, []);

  return <div></div>;
};

export default VerifyEmail;

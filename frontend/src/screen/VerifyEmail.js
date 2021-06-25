import React, { useEffect } from "react";
import axios from "axios";

const VerifyEmail = ({ history, match }) => {
  const verifyUserEmail = async (ref) => {
    const { data } = await axios.post(`/api/v1/newslatter/${ref}`);
    if (data.status) {
      history.push("https://www.google.com/");
    }
  };

  useEffect(() => {
    if (!match.param.ref) {
      history.push("/");
    }
    verifyUserEmail(match.param.ref);
  }, []);
  return <div></div>;
};

export default VerifyEmail;

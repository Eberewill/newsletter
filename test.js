import sendmail from "./backend/utils/sendMail.js";

const obj = {
  email: "eberewill@gmail.com",
  message: "williams I love you",
  subject: "Love Matter",
};

sendmail(obj)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

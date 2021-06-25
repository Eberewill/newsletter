import axios from "axios";

const sendmail = (messaggeObj) => {
  return new Promise((resolve, reject) => {
    let options = {
      method: "POST",
      url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": process.env.X_Rapidapi_Key,
        "x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com",
      },
      data: {
        personalizations: [
          {
            to: [{ email: messaggeObj.email }],
            subject: "Newsletter Notification",
          },
        ],
        from: { email: process.env.FROM_EMAIL },
        content: [{ type: "text/plain", value: messaggeObj.message }],
      },
    };

    axios
      .request(options)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export default sendmail;

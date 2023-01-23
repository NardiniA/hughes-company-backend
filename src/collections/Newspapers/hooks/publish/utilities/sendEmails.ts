import { request } from "../../../../../utilities/request";

type SendEmails = {
  status: number,
  response: any,
}

export const sendEmails = async (data: object): Promise<SendEmails> => {
  if (data) {
    try {
      const req = await request("https://api.sendinblue.com/v3/smtp/email", {
        body: JSON.stringify(data),
      });

      if (req?.status !== 200)
        throw new Error("Request Error", {
          cause: {
            req: req?.response,
          },
        });

      return req;
    } catch (err) {
      console.error(`Unable to send - sendEmails.ts; Error: ${err}`);

      return {
        status: 500,
        response: err,
      };
    }
  }

  return {
    status: 404,
    response: "No data received",
  };
};

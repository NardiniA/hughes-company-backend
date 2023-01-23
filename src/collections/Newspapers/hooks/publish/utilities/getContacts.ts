import { request } from "../../../../../utilities/request";

export const getContacts = async (): Promise<any> => {
    const { status, response } = await request(
      `https://api.sendinblue.com/v3/contacts/lists/${process.env.SIB_LIST_ID}/contacts`,
      {
        method: "GET",
      }
    );
    
    if (status !== 200 || !response?.contacts) {
        console.error("Unable to get contacts - getContacts.ts");
        console.error(`Error: ${response}`);
        return false;
    }

    return response?.contacts;
}
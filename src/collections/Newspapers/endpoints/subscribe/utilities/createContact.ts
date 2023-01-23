import { request } from "../../../../../utilities/request"

type Created = {
    created: boolean,
};

export const createContact = async (data: object): Promise<Created> => {
    if (data) {
        try {
            const req = await request("https://api.sendinblue.com/v3/contacts", {
                body: JSON.stringify(data),
            });

            if (req?.status !== 200) throw new Error("Unable to create contact", {
                cause: {
                    req,
                }
            });

            return {
                created: req?.status === 200,
            }
        } catch (err) {
            console.error(err);
            return {
                created: false,
            };
        }
    }

    return {
        created: false,
    };
}
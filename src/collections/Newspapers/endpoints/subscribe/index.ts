import payload from "payload";
import { Endpoint } from "payload/config";
import { createContact } from "./utilities/createContact";

const subscribe: Endpoint = {
    path: "/actions/subscribe",
    method: "post",
    handler: async (req, res, next) => {
        const { body } = req;

        if (!body) return next("No request body found");

        try {
            const site = await payload.find({
                collection: "sites",
                where: {
                    slug: {
                        equals: body?.site,
                    },
                },
            });

            if (!site?.docs?.length) throw new Error("Site Not Found");

            const data = {
                email: body?.email,
                listIds: [site?.docs[0]?.listId]
            }

            if (body?.attributes) data["attributes"] = body?.attributes;

            const { created } = await createContact(data);

            if (created) return res.status(200).json({ message: "Subscribed!" });
            else return res.status(500).json({ message: "Unable to subscribe" });
        } catch (err) {
            payload.logger.error(err);
            return next(err);
        }

        return res.status(200).json({ message: "Success", body });
    },
}

export default subscribe;

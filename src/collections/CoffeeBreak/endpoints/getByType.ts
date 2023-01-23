import payload from "payload";
import { Endpoint } from "payload/config";

const getByType: Endpoint = {
    path: "/get/:site/:type",
    method: "get",
    handler: async (req, res, next) => {
        if (!req?.params?.site || !req?.params?.type) return res.status(400).json({ message: "No site param found" });
        try {
            const breaks = await payload.find({
                collection: "coffee-break",
                where: {
                    sites: {
                        in: [req?.params?.site],
                    },
                    type: {
                        equals: req?.params?.type,
                    },
                },
            });

            if (!breaks?.docs?.length) throw new Error("No articles found");

            return res.status(200).json({ message: "Success", docs: breaks?.docs });
        } catch (err) {
            console.error(err);
            return next(err);
        }
    },
};

export default getByType;